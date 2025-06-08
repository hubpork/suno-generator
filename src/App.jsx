import { useState } from "react";

const prompts = {
  melancholy: [
    "Acoustic, minimalist, melancholy tone, solo guitar, rainy day, personal reflection",
    "Piano-driven, sparse strings, emotional storytelling, open chords, gentle tension",
    "Lo-fi folk, intimate vocals, bedroom production, regretful lyrics, reflective tone",
    "Slow indie rock, echoey guitars, haunting harmonies, dusk atmosphere, nostalgic mood",
    "Dream pop texture, breathy vocals, shimmering pads, inner sadness, underwater feel"
  ],
  empowerment: [
    "Rock anthem, strong electric guitar, fast tempo, victory energy, stadium-sized chorus",
    "Orchestral hybrid, cinematic rise, bold brass and drums, hero moment, no holding back",
    "Electronic dance beat, pulsing rhythm, hype drop, crowd chant feel, big energy burst",
    "Industrial pop, distorted synths, defiant lyrics, marching rhythm, rise-from-ashes vibe"
  ],
  romantic: [
    "Soft acoustic guitar, slow tempo, heartfelt lyrics, candlelight tone, romantic confession",
    "Warm piano chords, delicate vocals, intimate tone, emotional lyrics, dreamy arrangement",
    "Mid-tempo R&B, smooth falsetto, sensual lyrics, soft groove, nighttime romance"
  ],
  storytelling: [
    "Acoustic folk ballad, personal journey, vivid imagery, campfire tone, honest lyrics",
    "Indie narrative song, descriptive verses, first-person voice, smalltown memory theme",
    "Cinematic arc, emotional climax, soft strings, character-driven story, poetic lyrics"
  ]
};

const voices = [
  "Soft female vocals",
  "Strong male vocals",
  "Whisper vocals",
  "Spoken word",
  "Distorted screams",
  "Child-like vocals",
  "Operatic soprano",
  "Auto-tuned pop vocals",
  "Vintage crooner style",
  "Deep robotic voice"
];

const styles = ["melancholy", "empowerment", "romantic", "storytelling", "random"];

export default function PromptGenerator() {
  const [voice, setVoice] = useState("");
  const [style, setStyle] = useState("");
  const [output, setOutput] = useState("");

  const generatePrompt = () => {
    if (!voice || !style) {
      alert("Bitte wähle sowohl eine Stimme als auch einen Stil aus.");
      return;
    }

    let chosenStyle = style;
    if (style === "random") {
      const keys = Object.keys(prompts);
      chosenStyle = keys[Math.floor(Math.random() * keys.length)];
    }

    const stylePrompts = prompts[chosenStyle];
    const randomPrompt = stylePrompts[Math.floor(Math.random() * stylePrompts.length)];
    setOutput(`${randomPrompt}, ${voice}`);
  };

  const copyPrompt = async () => {
    if (!output.trim()) {
      alert("Es gibt keinen Prompt zum Kopieren.");
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      alert("Prompt wurde in die Zwischenablage kopiert.");
    } catch {
      alert("Fehler beim Kopieren des Prompts.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h2 className="text-2xl lg:text-3xl font-bold mb-4">🎸 Suno Prompt Generator</h2>
      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        <div className="flex flex-col">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-left" for="voice">Wähle eine Stimme:</label>
          <select
          id="voice"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
          >
          <option value="">-- Bitte auswählen --</option>
          {voices.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" for="style">Wähle einen Stil:</label>
        <select
          id="style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="">-- Bitte auswählen --</option>
          {styles.map((s) => (
            <option key={s} value={s}>{s === "random" ? "🎲 Zufälliger Stil" : s}</option>
          ))}
        </select>
       </div>
      </div>
      <button
        onClick={generatePrompt}
        className="bg-black text-white px-4 py-2 mb-5 rounded"
      >
        Prompt generieren
      </button>

      <label for="output" className="text-2xl font-bold mb-4">Prompt</label>
      <textarea
        id="output"
        readOnly
        value={output}
         className="w-full max-w-xl h-48 p-4 border border-gray-300 rounded font-mono"
      />

      <button
        onClick={copyPrompt}
        className="bg-black text-white px-4 py-2 rounded my-5"
      >
        📋 In Zwischenablage kopieren
      </button>
    </div>
  );
}