import argparse
import os
import time

from dotenv import load_dotenv
from sarvamai import SarvamAI
from sarvamai.play import save
from typing import Dict, List, Tuple

load_dotenv()
# Initialize Sarvam AI client using environment variable
API_KEY = os.getenv("SARVAM_API_KEY")
if not API_KEY:
    raise ValueError("Please set SARVAM_API_KEY environment variable")

client = SarvamAI(api_subscription_key=API_KEY)

# Configuration
SPEAKER = "vidya"
MODEL = "bulbul:v2"
BASE_DIR = "audio_assets"

# Content data: (english_text, malayalam_text)
CATEGORIES = {
    "colors": ("colors", "നിറങ്ങൾ"),
    "animals" : ("animals", "മൃഗങ്ങൾ"),
    "body_parts" : ("body parts", "ശരീരഭാഗങ്ങൾ"),
    "numbers" : ("numbers", "സംഖ്യകൾ"),
    "planets" : ("planets", "ഗ്രഹങ്ങൾ"),
    "weekdays" : ("weekdays", "ആഴ്ചയിലെ ദിവസങ്ങൾ"),
    "feedback" : ("feedback", "ഫീഡ്ബാക്ക്")
}

ANIMALS = {
    "lion": ("Lion", "സിംഹം"),
    "tiger": ("Tiger", "കടുവ"),
    "monkey": ("Monkey", "കുരങ്ങ്"),
    "cat": ("Cat", "പൂച്ച"),
    "dog": ("Dog", "നായ്"),
    "cow": ("Cow", "പശു"),
    "elephant": ("Elephant", "ആന"),
    "rabbit": ("Rabbit", "മുയൽ")
}

BODY_PARTS = {
    "head": ("Head", "തല"),
    "eye": ("Eye", "കണ്ണ്"),
    "nose": ("Nose", "മൂക്ക്"),
    "mouth": ("Mouth", "വായ്"),
    "ear": ("Ear", "ചെവി"),
    "hair": ("Hair", "മുടി"),
    "face": ("Face", "മുഖം"),
    "neck": ("Neck", "കഴുത്ത്"),
    "shoulder": ("Shoulder", "തോൾ"),
    "arm": ("Arm", "കൈ"),
    "hand": ("Hand", "കൈ"),
    "finger": ("Finger", "വിരൽ"),
    "chest": ("Chest", "നെഞ്ച്"),
    "stomach": ("Stomach", "വയറ്"),
    "back": ("Back", "പുറം"),
    "leg": ("Leg", "കാൽ"),
    "foot": ("Foot", "പാദം"),
    "toe": ("Toe", "കാൽവിരൽ")
}

COLORS = {
    "red": ("Red", "ചുവപ്പ്"),
    "blue": ("Blue", "നീല"),
    "green": ("Green", "പച്ച"),
    "yellow": ("Yellow", "മഞ്ഞ"),
    "orange": ("Orange", "ഓറഞ്ച്"),
    "purple": ("Purple", "ധൂമ്രം"),
    "pink": ("Pink", "പിങ്ക്"),
    "brown": ("Brown", "തവിട്ട്"),
    "black": ("Black", "കറുപ്പ്"),
    "white": ("White", "വെള്ള"),
    "gray": ("Gray", "ചാരനിറം")
}

PLANETS = {
    "mercury": ("Mercury", "ബുധൻ"),
    "venus": ("Venus", "ശുക്രൻ"),
    "earth": ("Earth", "ഭൂമി"),
    "mars": ("Mars", "ചൊവ്വ"),
    "jupiter": ("Jupiter", "വ്യാഴം"),
    "saturn": ("Saturn", "ശനി"),
    "uranus": ("Uranus", "യുറാനസ്"),
    "neptune": ("Neptune", "നെപ്ട്യൂൺ")
}

WEEKDAYS = {
    "monday": ("Monday", "തിങ്കളാഴ്ച"),
    "tuesday": ("Tuesday", "ചൊവ്വാഴ്ച"),
    "wednesday": ("Wednesday", "ബുധനാഴ്ച"),
    "thursday": ("Thursday", "വ്യാഴാഴ്ച"),
    "friday": ("Friday", "വെള്ളിയാഴ്ച"),
    "saturday": ("Saturday", "ശനിയാഴ്ച"),
    "sunday": ("Sunday", "ഞായറാഴ്ച")
}

# Numbers: 0-100, 110-190 (by 10s), 200-1000 (by 100s)
NUMBERS = {}

# Base numbers 0-100
ENGLISH_NUMBERS = [
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
    "twenty-one", "twenty-two", "twenty-three", "twenty-four", "twenty-five", "twenty-six", "twenty-seven", "twenty-eight", "twenty-nine", "thirty",
    "thirty-one", "thirty-two", "thirty-three", "thirty-four", "thirty-five", "thirty-six", "thirty-seven", "thirty-eight", "thirty-nine", "forty",
    "forty-one", "forty-two", "forty-three", "forty-four", "forty-five", "forty-six", "forty-seven", "forty-eight", "forty-nine", "fifty",
    "fifty-one", "fifty-two", "fifty-three", "fifty-four", "fifty-five", "fifty-six", "fifty-seven", "fifty-eight", "fifty-nine", "sixty",
    "sixty-one", "sixty-two", "sixty-three", "sixty-four", "sixty-five", "sixty-six", "sixty-seven", "sixty-eight", "sixty-nine", "seventy",
    "seventy-one", "seventy-two", "seventy-three", "seventy-four", "seventy-five", "seventy-six", "seventy-seven", "seventy-eight", "seventy-nine", "eighty",
    "eighty-one", "eighty-two", "eighty-three", "eighty-four", "eighty-five", "eighty-six", "eighty-seven", "eighty-eight", "eighty-nine", "ninety",
    "ninety-one", "ninety-two", "ninety-three", "ninety-four", "ninety-five", "ninety-six", "ninety-seven", "ninety-eight", "ninety-nine", "one hundred"
]

MALAYALAM_NUMBERS = [
    "പൂജ്യം", "ഒന്ന്", "രണ്ട്", "മൂന്ന്", "നാല്", "അഞ്ച്", "ആറ്", "ഏഴ്", "എട്ട്", "ഒമ്പത്", "പത്ത്",
    "പതിനൊന്ന്", "പന്ത്രണ്ട്", "പതിമൂന്ന്", "പതിനാല്", "പതിനഞ്ച്", "പതിനാറ്", "പതിനേഴ്", "പതിനെട്ട്", "പത്തൊമ്പത്", "ഇരുപത്",
    "ഇരുപത്തിയൊന്ന്", "ഇരുപത്തിയിരണ്ട്", "ഇരുപത്തിയമൂന്ന്", "ഇരുപത്തിയനാല്", "ഇരുപത്തിയഞ്ച്", "ഇരുപത്തിയാറ്", "ഇരുപത്തിയേഴ്", "ഇരുപത്തിയെട്ട്", "ഇരുപത്തിയൊമ്പത്", "മുപ്പത്",
    "മുപ്പത്തിയൊന്ന്", "മുപ്പത്തിയിരണ്ട്", "മുപ്പത്തിയമൂന്ന്", "മുപ്പത്തിയനാല്", "മുപ്പത്തിയഞ്ച്", "മുപ്പത്തിയാറ്", "മുപ്പത്തിയേഴ്", "മുപ്പത്തിയെട്ട്", "മുപ്പത്തിയൊമ്പത്", "നാല്പത്",
    "നാല്പത്തിയൊന്ന്", "നാല്പത്തിയിരണ്ട്", "നാല്പത്തിയമൂന്ന്", "നാല്പത്തിയനാല്", "നാല്പത്തിയഞ്ച്", "നാല്പത്തിയാറ്", "നാല്പത്തിയേഴ്", "നാല്പത്തിയെട്ട്", "നാല്പത്തിയൊമ്പത്", "അമ്പത്",
    "അമ്പത്തിയൊന്ന്", "അമ്പത്തിയിരണ്ട്", "അമ്പത്തിയമൂന്ന്", "അമ്പത്തിയനാല്", "അമ്പത്തിയഞ്ച്", "അമ്പത്തിയാറ്", "അമ്പത്തിയേഴ്", "അമ്പത്തിയെട്ട്", "അമ്പത്തിയൊമ്പത്", "അറുപത്",
    "അറുപത്തിയൊന്ന്", "അറുപത്തിയിരണ്ട്", "അറുപത്തിയമൂന്ന്", "അറുപത്തിയനാല്", "അറുപത്തിയഞ്ച്", "അറുപത്തിയാറ്", "അറുപത്തിയേഴ്", "അറുപത്തിയെട്ട്", "അറുപത്തിയൊമ്പത്", "എഴുപത്",
    "എഴുപത്തിയൊന്ന്", "എഴുപത്തിയിരണ്ട്", "എഴുപത്തിയമൂന്ന്", "എഴുപത്തിയനാല്", "എഴുപത്തിയഞ്ച്", "എഴുപത്തിയാറ്", "എഴുപത്തിയേഴ്", "എഴുപത്തിയെട്ട്", "എഴുപത്തിയൊമ്പത്", "എൺപത്",
    "എൺപത്തിയൊന്ന്", "എൺപത്തിയിരണ്ട്", "എൺപത്തിയമൂന്ന്", "എൺപത്തിയനാല്", "എൺപത്തിയഞ്ച്", "എൺപത്തിയാറ്", "എൺപത്തിയേഴ്", "എൺപത്തിയെട്ട്", "എൺപത്തിയൊമ്പത്", "തൊണ്ണൂറ്",
    "തൊണ്ണൂറ്റിയൊന്ന്", "തൊണ്ണൂറ്റിയിരണ്ട്", "തൊണ്ണൂറ്റിയമൂന്ന്", "തൊണ്ണൂറ്റിയനാല്", "തൊണ്ണൂറ്റിയഞ്ച്", "തൊണ്ണൂറ്റിയാറ്", "തൊണ്ണൂറ്റിയേഴ്", "തൊണ്ണൂറ്റിയെട്ട്", "തൊണ്ണൂറ്റിയൊമ്പത്", "നൂറ്"
]

# Additional numbers for 110-190 (by 10s)
ADDITIONAL_ENGLISH = [
    "one hundred ten", "one hundred twenty", "one hundred thirty", "one hundred forty", "one hundred fifty",
    "one hundred sixty", "one hundred seventy", "one hundred eighty", "one hundred ninety"
]

ADDITIONAL_MALAYALAM = [
    "നൂറ്റിപ്പത്ത്", "നൂറ്റിയിരുപത്", "നൂറ്റിമുപ്പത്", "നൂറ്റിനാല്പത്", "നൂറ്റിഅമ്പത്",
    "നൂറ്റിഅറുപത്", "നൂറ്റിഎഴുപത്", "നൂറ്റിഎൺപത്", "നൂറ്റിതൊണ്ണൂറ്"
]

# Additional numbers for 200-1000 (by 100s)
HUNDREDS_ENGLISH = [
    "two hundred", "three hundred", "four hundred", "five hundred", "six hundred",
    "seven hundred", "eight hundred", "nine hundred", "one thousand"
]

HUNDREDS_MALAYALAM = [
    "ഇരുനൂറ്", "മുന്നൂറ്", "നാനൂറ്", "അഞ്ഞൂറ്", "അറുനൂറ്",
    "എഴുനൂറ്", "എണ്ണൂറ്", "നവനൂറ്", "ആയിരം"
]

# Generate numbers dictionary
# Add 0-100
for i in range(101):
    key = f"{i:03d}"
    NUMBERS[key] = (ENGLISH_NUMBERS[i], MALAYALAM_NUMBERS[i])

# Add 110-190 (by 10s)
for i, num in enumerate([110, 120, 130, 140, 150, 160, 170, 180, 190]):
    key = f"{num:03d}"
    NUMBERS[key] = (ADDITIONAL_ENGLISH[i], ADDITIONAL_MALAYALAM[i])

# Add 200-1000 (by 100s)
for i, num in enumerate([200, 300, 400, 500, 600, 700, 800, 900, 1000]):
    key = f"{num:04d}" if num == 1000 else f"{num:03d}"
    NUMBERS[key] = (HUNDREDS_ENGLISH[i], HUNDREDS_MALAYALAM[i])

# Feedback messages
FEEDBACK = {
    "wrong": ("Wrong Answer. Please Try Again", "തെറ്റായ ഉത്തരം. വീണ്ടും ശ്രമിക്കുക!"),
    "correct": ("Correct Answer!", "ശരിയായ ഉത്തരം!")
}

def create_directory_structure():
    """Create the directory structure for audio files."""
    categories = list(CATEGORIES.keys())
    languages = ["en", "ml"]
    
    for lang in languages:
        for category in categories:
            path = os.path.join(BASE_DIR, lang, category)
            os.makedirs(path, exist_ok=True)
            print(f"Created directory: {path}")

def generate_audio(text: str, language_code: str, output_path: str) -> bool:
    """Generate audio file using Sarvam AI."""
    try:
        print(f"Generating: {output_path}")
        print(f"Text: {text} (Language: {language_code})")
        
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

def generate_category_audio(category_name: str, data_dict: Dict[str, Tuple[str, str]]):
    """Generate audio files for a specific category."""
    print(f"\n🎵 Generating {category_name.upper()} audio files...")
    
    success_count = 0
    total_count = len(data_dict) * 2  # 2 languages per item
    
    for key, (english_text, malayalam_text) in data_dict.items():
        # English audio
        en_path = os.path.join(BASE_DIR, "en", category_name, f"{category_name}_{key}_en.wav")
        if generate_audio(english_text, "en-IN", en_path):
            success_count += 1
        
        # Malayalam audio  
        ml_path = os.path.join(BASE_DIR, "ml", category_name, f"{category_name}_{key}_ml.wav")
        if generate_audio(malayalam_text, "ml-IN", ml_path):
            success_count += 1
            
        # Small delay to avoid hitting API rate limits
        time.sleep(0.5)
    
    print(f"📊 {category_name.capitalize()}: {success_count}/{total_count} files generated successfully")
    return success_count, total_count

def parse_arguments():
    """Parse command line arguments for category selection."""
    parser = argparse.ArgumentParser(
        description="Generate audio files for preschool game categories using Sarvam AI",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python script.py                           # Generate all categories
  python script.py animals colors           # Generate only animals and colors
  python script.py numbers                  # Generate only numbers
  python script.py feedback categories      # Generate only feedback and categories

Available categories: animals, body_parts, colors, planets, weekdays, numbers, feedback, categories
        """
    )
    
    parser.add_argument(
        'categories',
        nargs='*',  # Accept zero or more arguments
        help='Specific categories to generate (default: all categories)'
    )
    
    return parser.parse_args()

def get_categories_to_generate(requested_categories: List[str]) -> List[Tuple[str, Dict]]:
    """Get the list of categories to generate based on user input."""
    
    # All available categories
    all_categories = [
        ("animals", ANIMALS),
        ("body_parts", BODY_PARTS), 
        ("colors", COLORS),
        ("planets", PLANETS),
        ("weekdays", WEEKDAYS),
        ("numbers", NUMBERS),
        ("feedback", FEEDBACK),
        ("categories", CATEGORIES)
    ]
    
    # If no specific categories requested, generate all
    if not requested_categories:
        print("🎯 No specific categories provided - generating ALL categories")
        return all_categories
    
    # Validate requested categories
    available_category_names = [cat[0] for cat in all_categories]
    invalid_categories = [cat for cat in requested_categories if cat not in available_category_names]
    
    if invalid_categories:
        print(f"❌ Invalid categories: {', '.join(invalid_categories)}")
        print(f"✅ Available categories: {', '.join(available_category_names)}")
        return []
    
    # Filter to only requested categories
    selected_categories = [cat for cat in all_categories if cat[0] in requested_categories]
    
    print(f"🎯 Generating specific categories: {', '.join(requested_categories)}")
    return selected_categories

def main():
    """Main function to generate all audio files."""
    # Parse command line arguments
    args = parse_arguments()
    
    print("🚀 Starting Sarvam AI Audio Generation for Preschool Game")
    print("=" * 60)
    
    # Get categories to generate
    categories_to_generate = get_categories_to_generate(args.categories)
    
    if not categories_to_generate:
        print("❌ No valid categories to generate. Exiting.")
        return
    
    # Create directory structure
    print("\n📁 Creating directory structure...")
    create_directory_structure()
    
    total_success = 0
    total_files = 0
    
    # Generate audio for selected categories
    for category_name, category_data in categories_to_generate:
        success, total = generate_category_audio(category_name, category_data)
        total_success += success
        total_files += total
    
    # Final summary
    print("\n" + "=" * 60)
    print("🎯 GENERATION COMPLETE!")
    print(f"📊 Total: {total_success}/{total_files} files generated successfully")
    print(f"✅ Success rate: {(total_success/total_files)*100:.1f}%")
    
    if total_success < total_files:
        print(f"⚠️  {total_files - total_success} files failed to generate")
        print("💡 Check your API key and internet connection")
    
    print(f"\n📂 Audio files saved in: {os.path.abspath(BASE_DIR)}")

if __name__ == "__main__":
    main()