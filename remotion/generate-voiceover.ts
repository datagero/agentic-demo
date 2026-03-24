/**
 * Voiceover generation script for Agentic Ops video.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=your_key node --strip-types generate-voiceover.ts
 *
 * Or set the key in .env and run:
 *   node --strip-types generate-voiceover.ts
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error("Missing ELEVENLABS_API_KEY environment variable");
  process.exit(1);
}

// Voice: "Adam" is a clear, professional male voice. Change voiceId to customize.
// Browse voices at https://elevenlabs.io/voice-library
const VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // Adam

const SCENES = [
  {
    id: "01-intro",
    text: "Agentic Ops. The agent operations platform.",
  },
  {
    id: "02-problem",
    text: "Your agents run in production. Four sessions running at once. Any of them could do anything. No budgets. No audit trail. No governance.",
  },
  {
    id: "03-pillars",
    text: "Two engines power the platform. Obs server manages sessions, blueprints, and containers. Agentic ops handles governance, policy, and analytics.",
  },
  {
    id: "04-deploy",
    text: "Deploy a team of agents. Planner. Implementer. Verifier. Coordinator. Witness. One config. Any combination. Instantly.",
  },
  {
    id: "05-analytics",
    text: "The analytics layer. Monitor productivity. Analyse conversations. Suggest optimal configurations. All in real time.",
  },
  {
    id: "06-govern",
    text: "Govern at every layer. Organization. Project. Session. Policies and personalities that flow through every level.",
  },
  {
    id: "07-possibilities",
    text: "What becomes possible? A B test your agents. Find optimal configurations. Self-healing infrastructure. One-shot or continuous loops. Open source shared policies.",
  },
  {
    id: "08-outro",
    text: "Operations for the agent generation. Open source.",
  },
];

const OUTPUT_DIR = "public/voiceover";

async function generateScene(scene: { id: string; text: string }) {
  const outPath = `${OUTPUT_DIR}/${scene.id}.mp3`;

  if (existsSync(outPath)) {
    console.log(`  ✓ ${scene.id} already exists, skipping`);
    return;
  }

  console.log(`  → Generating ${scene.id}...`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY!,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: scene.text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.75,
          style: 0.2,
        },
      }),
    },
  );

  if (!response.ok) {
    const err = await response.text();
    console.error(`  ✗ Failed for ${scene.id}: ${response.status} ${err}`);
    return;
  }

  const audioBuffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(outPath, audioBuffer);
  console.log(`  ✓ ${scene.id} saved (${(audioBuffer.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log("Generating voiceover for Agentic Ops video...\n");

  for (const scene of SCENES) {
    await generateScene(scene);
  }

  console.log("\nDone! Files saved to public/voiceover/");
  console.log("Preview in Remotion Studio to hear the audio.");
}

main().catch(console.error);
