#!/usr/bin/env python3
"""
Start script for Python Flask application
"""

import os
import subprocess
import sys

def main():
    """Start the Python Flask application"""
    print("🚀 Starting Football App (Python Version)...")
    
    # Set environment variables
    os.environ['FLASK_APP'] = 'app.py'
    os.environ['FLASK_ENV'] = 'development'
    
    # Start the Flask application
    try:
        subprocess.run([sys.executable, 'app.py'], check=True)
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
    except Exception as e:
        print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    main()