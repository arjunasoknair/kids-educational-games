from dotenv import load_dotenv
from sarvamai import SarvamAI
from sarvamai.play import save

load_dotenv()
# Initialize Sarvam AI client using environment variable
API_KEY = os.getenv("SARVAM_API_KEY")
if not API_KEY:
    raise ValueError("Please set SARVAM_API_KEY environment variable")

client = SarvamAI(api_subscription_key=API_KEY)

# Convert text to speech
audio = client.text_to_speech.convert(
      target_language_code="ml-IN",
      text="ഒന്ന്",
      model="bulbul:v2",
      speaker="vidya",
      pace=0.5,
      loudness=0.5
  )

save(audio, "output1.wav")
