#!/usr/bin/env python3
"""
3D Portfolio Website Launcher

A simple script to launch the interactive 3D portfolio website
with a local development server.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
HOST = 'localhost'

def find_available_port(start_port=8000):
    """Find an available port starting from the given port."""
    import socket
    port = start_port
    while port < start_port + 100:  # Try 100 ports
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind((HOST, port))
                return port
        except OSError:
            port += 1
    return None

def main():
    """Launch the 3D portfolio website."""
    print("🚀 3D Portfolio Website Launcher")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not Path('index.html').exists():
        print("❌ Error: index.html not found!")
        print("Please run this script from the portfolio root directory.")
        sys.exit(1)
    
    # Find available port
    available_port = find_available_port(PORT)
    if not available_port:
        print(f"❌ Error: No available ports starting from {PORT}")
        sys.exit(1)
    
    if available_port != PORT:
        print(f"⚠️  Port {PORT} is busy, using port {available_port} instead")
    
    # Start the server
    try:
        handler = http.server.SimpleHTTPRequestHandler
        
        # Suppress default log messages
        class QuietHandler(handler):
            def log_message(self, format, *args):
                pass
        
        with socketserver.TCPServer((HOST, available_port), QuietHandler) as httpd:
            url = f"http://{HOST}:{available_port}"
            
            print(f"✅ Server starting at: {url}")
            print(f"📁 Serving files from: {os.getcwd()}")
            print(f"🌐 Opening browser...")
            print("=" * 40)
            print("💡 Features included:")
            print("   • Interactive 3D models with Three.js")
            print("   • Mouse hover and click interactions")
            print("   • Particle system background")
            print("   • Responsive design")
            print("   • Smooth section transitions")
            print("=" * 40)
            print("🔧 Controls:")
            print("   • Mouse: Navigate and interact with 3D objects")
            print("   • Scroll: Switch between portfolio sections")
            print("   • Click: Interact with 3D models and UI elements")
            print("=" * 40)
            print("🛑 Press Ctrl+C to stop the server")
            print()
            
            # Open browser
            try:
                webbrowser.open(url)
            except Exception as e:
                print(f"⚠️  Could not open browser automatically: {e}")
                print(f"Please manually navigate to: {url}")
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        print("Thanks for checking out the 3D Portfolio! 🎉")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()