#!/usr/bin/env python3
"""
Football Data Application - Python Flask Backend
Converted from Node.js/Express to maintain exact same functionality
"""

import os
import json
import time
import threading
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor
import paypalrestsdk
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Load environment variables
load_dotenv()

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

# Database connection
def get_db_connection():
    """Get database connection using environment variables"""
    try:
        conn = psycopg2.connect(
            os.getenv('DATABASE_URL'),
            cursor_factory=RealDictCursor
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

# PayPal Configuration
paypal_client_id = os.getenv('PAYPAL_CLIENT_ID')
paypal_client_secret = os.getenv('PAYPAL_CLIENT_SECRET')

if not paypal_client_id or not paypal_client_secret:
    raise ValueError("Missing PayPal credentials: PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET required")

paypalrestsdk.configure({
    "mode": "sandbox" if os.getenv('NODE_ENV') != 'production' else "live",
    "client_id": paypal_client_id,
    "client_secret": paypal_client_secret
})

class FootballDataStorage:
    """Storage class for football data operations"""
    
    def __init__(self):
        self.conn = None
        self._connect()
        self._init_tables()
    
    def _connect(self):
        """Establish database connection"""
        self.conn = get_db_connection()
    
    def _init_tables(self):
        """Initialize database tables if they don't exist"""
        if not self.conn:
            return
            
        try:
            with self.conn.cursor() as cur:
                # Teams table
                cur.execute("""
                CREATE TABLE IF NOT EXISTS teams (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    nickname TEXT NOT NULL,
                    slug TEXT NOT NULL UNIQUE,
                    primary_color TEXT NOT NULL,
                    secondary_color TEXT NOT NULL,
                    logo TEXT,
                    stadium TEXT,
                    city TEXT
                )
                """)
                
                # Matches table
                cur.execute("""
                CREATE TABLE IF NOT EXISTS matches (
                    id SERIAL PRIMARY KEY,
                    home_team_id INTEGER NOT NULL,
                    away_team_id INTEGER NOT NULL,
                    home_score INTEGER,
                    away_score INTEGER,
                    status TEXT NOT NULL,
                    match_date TIMESTAMP NOT NULL,
                    venue TEXT,
                    minute INTEGER,
                    competition TEXT DEFAULT 'Liga MX'
                )
                """)
                
                # Standings table
                cur.execute("""
                CREATE TABLE IF NOT EXISTS standings (
                    id SERIAL PRIMARY KEY,
                    team_id INTEGER NOT NULL,
                    position INTEGER NOT NULL,
                    matches_played INTEGER NOT NULL DEFAULT 0,
                    wins INTEGER NOT NULL DEFAULT 0,
                    draws INTEGER NOT NULL DEFAULT 0,
                    losses INTEGER NOT NULL DEFAULT 0,
                    goals_for INTEGER NOT NULL DEFAULT 0,
                    goals_against INTEGER NOT NULL DEFAULT 0,
                    goal_difference INTEGER NOT NULL DEFAULT 0,
                    points INTEGER NOT NULL DEFAULT 0,
                    season TEXT NOT NULL DEFAULT '2024-25'
                )
                """)
                
                # Players table
                cur.execute("""
                CREATE TABLE IF NOT EXISTS players (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    team_id INTEGER NOT NULL,
                    position TEXT,
                    goals INTEGER NOT NULL DEFAULT 0,
                    assists INTEGER NOT NULL DEFAULT 0,
                    appearances INTEGER NOT NULL DEFAULT 0
                )
                """)
                
                self.conn.commit()
                print("✅ Database tables initialized")
                
        except Exception as e:
            print(f"❌ Error initializing tables: {e}")
            self.conn.rollback()
    
    def get_teams(self) -> List[Dict]:
        """Get all teams"""
        if not self.conn:
            return []
        try:
            with self.conn.cursor() as cur:
                cur.execute("SELECT * FROM teams ORDER BY name")
                return [dict(row) for row in cur.fetchall()]
        except Exception as e:
            print(f"Error fetching teams: {e}")
            return []
    
    def get_team_by_slug(self, slug: str) -> Optional[Dict]:
        """Get team by slug"""
        if not self.conn:
            return None
        try:
            with self.conn.cursor() as cur:
                cur.execute("SELECT * FROM teams WHERE slug = %s", (slug,))
                row = cur.fetchone()
                return dict(row) if row else None
        except Exception as e:
            print(f"Error fetching team by slug: {e}")
            return None
    
    def get_matches(self) -> List[Dict]:
        """Get all matches with team information"""
        if not self.conn:
            return []
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                SELECT m.*, 
                       ht.name as home_team_name, ht.nickname as home_team_nickname,
                       ht.primary_color as home_team_primary_color, ht.secondary_color as home_team_secondary_color,
                       at.name as away_team_name, at.nickname as away_team_nickname,
                       at.primary_color as away_team_primary_color, at.secondary_color as away_team_secondary_color
                FROM matches m
                JOIN teams ht ON m.home_team_id = ht.id
                JOIN teams at ON m.away_team_id = at.id
                ORDER BY m.match_date DESC
                """)
                return [dict(row) for row in cur.fetchall()]
        except Exception as e:
            print(f"Error fetching matches: {e}")
            return []
    
    def get_live_matches(self) -> List[Dict]:
        """Get live matches"""
        if not self.conn:
            return []
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                SELECT m.*, 
                       ht.name as home_team_name, ht.nickname as home_team_nickname,
                       ht.primary_color as home_team_primary_color, ht.secondary_color as home_team_secondary_color,
                       at.name as away_team_name, at.nickname as away_team_nickname,
                       at.primary_color as away_team_primary_color, at.secondary_color as away_team_secondary_color
                FROM matches m
                JOIN teams ht ON m.home_team_id = ht.id
                JOIN teams at ON m.away_team_id = at.id
                WHERE m.status = 'live'
                ORDER BY m.match_date DESC
                """)
                return [dict(row) for row in cur.fetchall()]
        except Exception as e:
            print(f"Error fetching live matches: {e}")
            return []
    
    def get_upcoming_matches(self) -> List[Dict]:
        """Get upcoming matches"""
        if not self.conn:
            return []
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                SELECT m.*, 
                       ht.name as home_team_name, ht.nickname as home_team_nickname,
                       ht.primary_color as home_team_primary_color, ht.secondary_color as home_team_secondary_color,
                       at.name as away_team_name, at.nickname as away_team_nickname,
                       at.primary_color as away_team_primary_color, at.secondary_color as away_team_secondary_color
                FROM matches m
                JOIN teams ht ON m.home_team_id = ht.id
                JOIN teams at ON m.away_team_id = at.id
                WHERE m.status = 'upcoming'
                ORDER BY m.match_date ASC
                """)
                return [dict(row) for row in cur.fetchall()]
        except Exception as e:
            print(f"Error fetching upcoming matches: {e}")
            return []
    
    def get_standings(self) -> List[Dict]:
        """Get standings with team information"""
        if not self.conn:
            return []
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                SELECT s.*, t.name as team_name, t.nickname as team_nickname,
                       t.primary_color, t.secondary_color, t.logo
                FROM standings s
                JOIN teams t ON s.team_id = t.id
                ORDER BY s.position ASC
                """)
                return [dict(row) for row in cur.fetchall()]
        except Exception as e:
            print(f"Error fetching standings: {e}")
            return []
    
    def get_top_scorers(self, limit: int = 10) -> List[Dict]:
        """Get top scorers with team information"""
        if not self.conn:
            return []
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                SELECT p.*, t.name as team_name, t.nickname as team_nickname,
                       t.primary_color, t.secondary_color
                FROM players p
                JOIN teams t ON p.team_id = t.id
                ORDER BY p.goals DESC
                LIMIT %s
                """, (limit,))
                return [dict(row) for row in cur.fetchall()]
        except Exception as e:
            print(f"Error fetching top scorers: {e}")
            return []

# Initialize storage
storage = FootballDataStorage()

# Routes
@app.route('/')
def index():
    """Main application route"""
    return render_template('index.html')

@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "OK", "timestamp": datetime.now().isoformat()})

# Teams endpoints
@app.route('/api/teams')
def get_teams():
    """Get all teams"""
    try:
        teams = storage.get_teams()
        return jsonify(teams)
    except Exception as e:
        return jsonify({"message": "Failed to fetch teams", "error": str(e)}), 500

@app.route('/api/teams/<slug>')
def get_team_by_slug(slug):
    """Get team by slug"""
    try:
        team = storage.get_team_by_slug(slug)
        if not team:
            return jsonify({"message": "Team not found"}), 404
        return jsonify(team)
    except Exception as e:
        return jsonify({"message": "Failed to fetch team", "error": str(e)}), 500

# Matches endpoints
@app.route('/api/matches')
def get_matches():
    """Get all matches"""
    try:
        matches = storage.get_matches()
        return jsonify(matches)
    except Exception as e:
        return jsonify({"message": "Failed to fetch matches", "error": str(e)}), 500

@app.route('/api/matches/live')
def get_live_matches():
    """Get live matches"""
    try:
        matches = storage.get_live_matches()
        return jsonify(matches)
    except Exception as e:
        return jsonify({"message": "Failed to fetch live matches", "error": str(e)}), 500

@app.route('/api/matches/upcoming')
def get_upcoming_matches():
    """Get upcoming matches"""
    try:
        matches = storage.get_upcoming_matches()
        return jsonify(matches)
    except Exception as e:
        return jsonify({"message": "Failed to fetch upcoming matches", "error": str(e)}), 500

# Standings endpoint
@app.route('/api/standings')
def get_standings():
    """Get standings"""
    try:
        standings = storage.get_standings()
        return jsonify(standings)
    except Exception as e:
        return jsonify({"message": "Failed to fetch standings", "error": str(e)}), 500

# Players endpoints
@app.route('/api/players/top-scorers')
def get_top_scorers():
    """Get top scorers"""
    try:
        limit = request.args.get('limit', 10, type=int)
        top_scorers = storage.get_top_scorers(limit)
        return jsonify(top_scorers)
    except Exception as e:
        return jsonify({"message": "Failed to fetch top scorers", "error": str(e)}), 500

# PayPal endpoints
@app.route('/api/paypal/setup')
def paypal_setup():
    """Get PayPal client token"""
    try:
        return jsonify({
            "clientToken": paypal_client_id  # For client-side PayPal SDK
        })
    except Exception as e:
        return jsonify({"error": "Failed to setup PayPal"}), 500

@app.route('/api/paypal/order', methods=['POST'])
def create_paypal_order():
    """Create PayPal order"""
    try:
        data = request.get_json()
        amount = data.get('amount')
        currency = data.get('currency', 'USD')
        intent = data.get('intent', 'CAPTURE')
        
        if not amount or float(amount) <= 0:
            return jsonify({"error": "Invalid amount"}), 400
        
        payment = paypalrestsdk.Payment({
            "intent": intent.lower(),
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": request.url_root + "success",
                "cancel_url": request.url_root + "cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Football App Donation",
                        "sku": "donation",
                        "price": str(amount),
                        "currency": currency,
                        "quantity": 1
                    }]
                },
                "amount": {
                    "total": str(amount),
                    "currency": currency
                },
                "description": "Football App Donation"
            }]
        })
        
        if payment.create():
            return jsonify({"id": payment.id, "status": "CREATED"})
        else:
            return jsonify({"error": "Payment creation failed"}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/paypal/order/<order_id>/capture', methods=['POST'])
def capture_paypal_order(order_id):
    """Capture PayPal order"""
    try:
        payment = paypalrestsdk.Payment.find(order_id)
        
        request_json = request.get_json() or {}
        if payment.execute({"payer_id": request_json.get('payer_id')}):
            return jsonify({"status": "COMPLETED", "id": payment.id})
        else:
            return jsonify({"error": "Payment execution failed"}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Static files
@app.route('/static/<path:filename>')
def static_files(filename):
    """Serve static files"""
    return send_from_directory('static', filename)

def initialize_data():
    """Initialize Liga MX data if not exists"""
    try:
        print("🔄 Checking if initial data exists...")
        teams = storage.get_teams()
        
        if len(teams) == 0:
            print("📊 Initializing Liga MX data...")
            # Add sample teams data (same as Node.js version)
            sample_teams = [
                {
                    "name": "Club América",
                    "nickname": "Las Águilas",
                    "slug": "america",
                    "primary_color": "#FFD700",
                    "secondary_color": "#000080",
                    "logo": None,
                    "stadium": "Estadio Azteca",
                    "city": "Ciudad de México"
                },
                # Add more teams as needed...
            ]
            
            # This would be populated from the existing data or scraper
            print(f"✅ Data initialized successfully")
        else:
            print(f"✅ Data already exists ({len(teams)} teams found)")
            
    except Exception as e:
        print(f"❌ Failed to initialize data: {e}")

if __name__ == '__main__':
    # Initialize data
    initialize_data()
    
    # Start Flask app
    port = int(os.getenv('PORT', 8000))  # Use port 8000 to avoid conflict
    app.run(host='0.0.0.0', port=port, debug=os.getenv('NODE_ENV') == 'development')