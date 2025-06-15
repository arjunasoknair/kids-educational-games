import os
import re
import sys
import time
from dotenv import load_dotenv
from sarvamai import SarvamAI
from sarvamai.play import save

# Load environment variables
load_dotenv()
API_KEY = os.getenv("SARVAM_API_KEY")
if not API_KEY:
    raise ValueError("Please set SARVAM_API_KEY environment variable")

client = SarvamAI(api_subscription_key=API_KEY)
SPEAKER = "vidya"
MODEL = "bulbul:v2"

# Paths
FLAGS_JS_PATH = os.path.join(os.path.dirname(__file__), "..", "flags-countries-game", "src", "data", "flags.js")
AUDIO_BASE = os.path.join(os.path.dirname(__file__), "..", "flags-countries-game", "audio_assets", "flags")

# Output folders
EN_DIR = os.path.join(AUDIO_BASE, "en")
ML_DIR = os.path.join(AUDIO_BASE, "ml")

os.makedirs(EN_DIR, exist_ok=True)
os.makedirs(ML_DIR, exist_ok=True)

def parse_flags_js():
    """Parse the flags.js file and extract relevant fields for each country."""
    with open(FLAGS_JS_PATH, encoding="utf-8") as f:
        content = f.read()

    # Find all country objects
    country_blocks = re.findall(r"{[^{}]+?factAudioMl: [^}]+?},", content, re.DOTALL)
    countries = []
    for block in country_blocks:
        def get_field(field):
            m = re.search(rf'{field}: "([^"]+)"', block)
            return m.group(1) if m else None
        country = {
            "name": get_field("name"),
            "continent": get_field("continent"),
            "capital": get_field("capital"),
            "funFactEn": get_field("funFactEn"),
            "funFactMl": get_field("funFactMl"),
            "nameAudio": get_field("nameAudio"),
            "continentAudio": get_field("continentAudio"),
            "capitalAudio": get_field("capitalAudio"),
            "factAudioEn": get_field("factAudioEn"),
            "factAudioMl": get_field("factAudioMl"),
        }
        countries.append(country)
    return countries

def generate_audio(text, language_code, output_path):
    try:
        print(f"Generating: {output_path}")
        audio = client.text_to_speech.convert(
            target_language_code=language_code,
            text=text,
            model=MODEL,
            speaker=SPEAKER
        )
        save(audio, output_path)
        print(f"✅ Successfully generated: {output_path}")
        return True
    except Exception as e:
        print(f"❌ Error generating {output_path}: {str(e)}")
        return False

def main():
    countries = parse_flags_js()
    total = 0
    success = 0
    for c in countries:
        # 1. Country name (English)
        if c["name"] and c["nameAudio"]:
            out = os.path.join(EN_DIR, c["nameAudio"])
            if generate_audio(c["name"], "en-IN", out):
                success += 1
            total += 1
        # 2. Continent name (English)
        if c["continent"] and c["continentAudio"]:
            out = os.path.join(EN_DIR, c["continentAudio"])
            if generate_audio(c["continent"], "en-IN", out):
                success += 1
            total += 1
        # 3. Capital name (English)
        if c["capital"] and c["capitalAudio"]:
            out = os.path.join(EN_DIR, c["capitalAudio"])
            if generate_audio(c["capital"], "en-IN", out):
                success += 1
            total += 1
        # 4. Fun fact (English)
        if c["funFactEn"] and c["factAudioEn"]:
            out = os.path.join(EN_DIR, c["factAudioEn"])
            if generate_audio(c["funFactEn"], "en-IN", out):
                success += 1
            total += 1
        # 5. Fun fact (Malayalam)
        if c["funFactMl"] and c["factAudioMl"]:
            out = os.path.join(ML_DIR, c["factAudioMl"])
            if generate_audio(c["funFactMl"], "ml-IN", out):
                success += 1
            total += 1
        # Small delay to avoid API rate limits
        time.sleep(0.5)
    print(f"\nDone! {success}/{total} files generated successfully.")

if __name__ == "__main__":
    main() 