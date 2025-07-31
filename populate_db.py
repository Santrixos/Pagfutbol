#!/usr/bin/env python3
"""
Populate database with Liga MX teams and sample data
"""

import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    """Get database connection"""
    return psycopg2.connect(
        os.getenv('DATABASE_URL'),
        cursor_factory=RealDictCursor
    )

def populate_teams(conn):
    """Populate teams table with Liga MX teams"""
    teams_data = [
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
        {
            "name": "Club Deportivo Guadalajara",
            "nickname": "Chivas",
            "slug": "chivas",
            "primary_color": "#FF0000",
            "secondary_color": "#FFFFFF",
            "logo": None,
            "stadium": "Estadio Akron",
            "city": "Guadalajara"
        },
        {
            "name": "Cruz Azul",
            "nickname": "La Máquina",
            "slug": "cruz-azul",
            "primary_color": "#0066CC",
            "secondary_color": "#FFFFFF",
            "logo": None,
            "stadium": "Estadio Azteca",
            "city": "Ciudad de México"
        },
        {
            "name": "Club Universidad Nacional",
            "nickname": "Pumas",
            "slug": "pumas",
            "primary_color": "#003366",
            "secondary_color": "#FFCC00",
            "logo": None,
            "stadium": "Estadio Olímpico Universitario",
            "city": "Ciudad de México"
        },
        {
            "name": "Tigres UANL",
            "nickname": "Los Tigres",
            "slug": "tigres",
            "primary_color": "#FFD700",
            "secondary_color": "#000000",
            "logo": None,
            "stadium": "Estadio Universitario",
            "city": "San Nicolás de los Garza"
        },
        {
            "name": "Club de Fútbol Monterrey",
            "nickname": "Rayados",
            "slug": "monterrey",
            "primary_color": "#003366",
            "secondary_color": "#FFFFFF",
            "logo": None,
            "stadium": "Estadio BBVA",
            "city": "Guadalupe"
        },
        {
            "name": "Santos Laguna",
            "nickname": "Los Guerreros",
            "slug": "santos",
            "primary_color": "#006600",
            "secondary_color": "#FFFFFF",
            "logo": None,
            "stadium": "Estadio Corona",
            "city": "Torreón"
        },
        {
            "name": "Club León",
            "nickname": "La Fiera",
            "slug": "leon",
            "primary_color": "#00AA00",
            "secondary_color": "#FFFFFF",
            "logo": None,
            "stadium": "Estadio León",
            "city": "León"
        },
        {
            "name": "Deportivo Toluca FC",
            "nickname": "Los Diablos Rojos",
            "slug": "toluca",
            "primary_color": "#CC0000",
            "secondary_color": "#FFFFFF",
            "logo": None,
            "stadium": "Estadio Nemesio Díez",
            "city": "Toluca"
        },
        {
            "name": "Club de Fútbol Pachuca",
            "nickname": "Los Tuzos",
            "slug": "pachuca",
            "primary_color": "#0066CC",
            "secondary_color": "#FFFFFF",
            "logo": None,
            "stadium": "Estadio Hidalgo",
            "city": "Pachuca"
        },
        {
            "name": "Atlas FC",
            "nickname": "Los Rojinegros",
            "slug": "atlas",
            "primary_color": "#CC0000",
            "secondary_color": "#000000",
            "logo": None,
            "stadium": "Estadio Jalisco",
            "city": "Guadalajara"
        },
        {
            "name": "Club Necaxa",
            "nickname": "Los Rayos",
            "slug": "necaxa",
            "primary_color": "#FF0000",
            "secondary_color": "#FFFFFF",
            "logo": None,
            "stadium": "Estadio Victoria",
            "city": "Aguascalientes"
        },
        {
            "name": "Club Tijuana",
            "nickname": "Xolos",
            "slug": "tijuana",
            "primary_color": "#CC0000",
            "secondary_color": "#000000",
            "logo": None,
            "stadium": "Estadio Caliente",
            "city": "Tijuana"
        },
        {
            "name": "Club Puebla",
            "nickname": "La Franja",
            "slug": "puebla",
            "primary_color": "#003366",
            "secondary_color": "#FFFFFF",
            "logo": None,
            "stadium": "Estadio Cuauhtémoc",
            "city": "Puebla"
        },
        {
            "name": "Querétaro FC",
            "nickname": "Los Gallos Blancos",
            "slug": "queretaro",
            "primary_color": "#003366",
            "secondary_color": "#FFFFFF",
            "logo": None,
            "stadium": "Estadio La Corregidora",
            "city": "Querétaro"
        },
        {
            "name": "Mazatlán FC",
            "nickname": "Los Cañoneros",
            "slug": "mazatlan",
            "primary_color": "#663399",
            "secondary_color": "#FFFFFF",
            "logo": None,
            "stadium": "Estadio de Mazatlán",
            "city": "Mazatlán"
        },
        {
            "name": "FC Juárez",
            "nickname": "Los Bravos",
            "slug": "fc-juarez",
            "primary_color": "#006600",
            "secondary_color": "#FF0000",
            "logo": None,
            "stadium": "Estadio Olímpico Benito Juárez",
            "city": "Ciudad Juárez"
        },
        {
            "name": "Atlético de San Luis",
            "nickname": "Los Potosinos",
            "slug": "atletico-san-luis",
            "primary_color": "#CC0000",
            "secondary_color": "#FFFFFF",
            "logo": None,
            "stadium": "Estadio Alfonso Lastras",
            "city": "San Luis Potosí"
        }
    ]

    with conn.cursor() as cur:
        # Clear existing teams
        cur.execute("DELETE FROM teams")
        
        # Insert teams
        for team in teams_data:
            cur.execute("""
                INSERT INTO teams (name, nickname, slug, primary_color, secondary_color, logo, stadium, city)
                VALUES (%(name)s, %(nickname)s, %(slug)s, %(primary_color)s, %(secondary_color)s, %(logo)s, %(stadium)s, %(city)s)
            """, team)
        
        conn.commit()
        print(f"✅ Inserted {len(teams_data)} teams")

def populate_standings(conn):
    """Populate standings with sample data"""
    with conn.cursor() as cur:
        # Get team IDs
        cur.execute("SELECT id, name FROM teams ORDER BY name")
        teams = cur.fetchall()
        
        # Clear existing standings
        cur.execute("DELETE FROM standings")
        
        # Create sample standings
        for i, team in enumerate(teams):
            standing_data = {
                "team_id": team['id'],
                "position": i + 1,
                "matches_played": 17,
                "wins": max(17 - i - 3, 2),
                "draws": min(i + 2, 8),
                "losses": max(i - 2, 0),
                "goals_for": max(30 - i, 10),
                "goals_against": min(15 + i, 40),
                "points": max(51 - (i * 3), 15),
                "season": "2024-25"
            }
            
            # Calculate goal difference
            standing_data["goal_difference"] = standing_data["goals_for"] - standing_data["goals_against"]
            
            cur.execute("""
                INSERT INTO standings (team_id, position, matches_played, wins, draws, losses, 
                                     goals_for, goals_against, goal_difference, points, season)
                VALUES (%(team_id)s, %(position)s, %(matches_played)s, %(wins)s, %(draws)s, %(losses)s,
                        %(goals_for)s, %(goals_against)s, %(goal_difference)s, %(points)s, %(season)s)
            """, standing_data)
        
        conn.commit()
        print(f"✅ Inserted {len(teams)} standings")

def populate_players(conn):
    """Populate players with sample data"""
    with conn.cursor() as cur:
        # Get team IDs
        cur.execute("SELECT id, name FROM teams")
        teams = cur.fetchall()
        
        # Clear existing players
        cur.execute("DELETE FROM players")
        
        # Sample player names and positions
        player_names = [
            "Roberto Alvarado", "Henry Martín", "Diego Valdés", "Jonathan Rodríguez",
            "Alexis Vega", "Alan Pulido", "Fernando Gorriarán", "Sebastián Córdova",
            "André-Pierre Gignac", "Florian Thauvin", "Jesús Angulo", "Maximiliano Meza",
            "Diego Lainez", "Julián Quiñones", "Luis Quiñones", "Nicolás López",
            "Germán Berterame", "Rogelio Funes Mori", "Santiago Giménez", "Carlos Vela",
            "Raúl Jiménez", "Diego Reyes", "Héctor Moreno", "César Montes",
            "Igor Lichnovsky", "Johan Vásquez", "Luis Romo", "Edson Álvarez"
        ]
        
        positions = ["Delantero", "Mediocampista", "Defensa", "Portero"]
        
        player_count = 0
        for team in teams:
            # Add 12-15 players per team
            num_players = min(15, len(player_names) - player_count)
            for i in range(num_players):
                if player_count >= len(player_names):
                    break
                    
                player_data = {
                    "name": player_names[player_count],
                    "team_id": team['id'],
                    "position": positions[player_count % len(positions)],
                    "goals": max(0, 20 - (player_count % 25)),
                    "assists": max(0, 15 - (player_count % 20)),
                    "appearances": min(17, 15 + (player_count % 3))
                }
                
                cur.execute("""
                    INSERT INTO players (name, team_id, position, goals, assists, appearances)
                    VALUES (%(name)s, %(team_id)s, %(position)s, %(goals)s, %(assists)s, %(appearances)s)
                """, player_data)
                
                player_count += 1
                if player_count >= len(player_names):
                    break
        
        conn.commit()
        print(f"✅ Inserted {player_count} players")

def populate_matches(conn):
    """Populate matches with sample data"""
    from datetime import datetime, timedelta
    import random
    
    with conn.cursor() as cur:
        # Get team IDs
        cur.execute("SELECT id FROM teams")
        team_ids = [row['id'] for row in cur.fetchall()]
        
        # Clear existing matches
        cur.execute("DELETE FROM matches")
        
        # Create sample matches
        base_date = datetime.now() - timedelta(days=30)
        
        matches_created = 0
        for i in range(50):  # Create 50 sample matches
            home_team = random.choice(team_ids)
            away_team = random.choice([t for t in team_ids if t != home_team])
            
            # Random match date within last 30 days or next 30 days
            match_date = base_date + timedelta(days=random.randint(-30, 30))
            
            # Determine status based on date
            if match_date < datetime.now() - timedelta(days=1):
                status = "finished"
                home_score = random.randint(0, 4)
                away_score = random.randint(0, 4)
                minute = None
            elif match_date < datetime.now() + timedelta(hours=2):
                status = "live" if random.random() < 0.1 else "finished"  # 10% chance of live
                home_score = random.randint(0, 3) if status == "live" else random.randint(0, 4)
                away_score = random.randint(0, 3) if status == "live" else random.randint(0, 4)
                minute = random.randint(1, 90) if status == "live" else None
            else:
                status = "upcoming"
                home_score = None
                away_score = None
                minute = None
            
            match_data = {
                "home_team_id": home_team,
                "away_team_id": away_team,
                "home_score": home_score,
                "away_score": away_score,
                "status": status,
                "match_date": match_date,
                "venue": "Estadio",
                "minute": minute,
                "competition": "Liga MX"
            }
            
            cur.execute("""
                INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, 
                                   status, match_date, venue, minute, competition)
                VALUES (%(home_team_id)s, %(away_team_id)s, %(home_score)s, %(away_score)s,
                        %(status)s, %(match_date)s, %(venue)s, %(minute)s, %(competition)s)
            """, match_data)
            
            matches_created += 1
        
        conn.commit()
        print(f"✅ Inserted {matches_created} matches")

def main():
    """Main function to populate database"""
    try:
        print("🔄 Connecting to database...")
        conn = get_db_connection()
        
        print("📊 Populating Liga MX data...")
        
        populate_teams(conn)
        populate_standings(conn)
        populate_players(conn)
        populate_matches(conn)
        
        conn.close()
        print("✅ Database populated successfully!")
        
    except Exception as e:
        print(f"❌ Error populating database: {e}")
        raise

if __name__ == "__main__":
    main()