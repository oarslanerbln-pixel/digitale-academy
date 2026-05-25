import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function getLocalFallback(message: string, lang: string): string {
  const lowercaseMsg = message.toLowerCase();
  
  if (lang === 'de') {
    if (lowercaseMsg.includes('preis') || lowercaseMsg.includes('kosten') || lowercaseMsg.includes('budget')) {
      return "Unsere Preisgestaltung orientiert sich ganz an dem individuellen Umfang Ihres Projekts. Bitte hinterlassen Sie Ihre E-Mail-Adresse im Chat oder schreiben Sie uns direkt an contact@1618-digital.de, damit wir Ihnen ein maßgeschneidertes Angebot unterbreiten können.";
    }
    if (lowercaseMsg.includes('service') || lowercaseMsg.includes('was macht ihr') || lowercaseMsg.includes('saas') || lowercaseMsg.includes('ki')) {
      return "1618 Digital bietet erstklassige 3D-SaaS-Ökosysteme (wie interaktive 3D-Konfiguratoren und Buchungsportale), rund um die Uhr erreichbare KI-Telefonassistenten sowie professionelle Filmdreh- und Postproduktions-Dienstleistungen. Hinterlassen Sie gern Ihre E-Mail-Adresse für ein Erstgespräch.";
    }
    return "Guten Tag! Ich bin der KI-Repräsentant von 1618 Digital. Gerne beantworte ich Ihre Fragen zu unseren Services und Projekten. Für eine persönliche Beratung können Sie Ihre E-Mail-Adresse oben eintragen oder uns direkt kontaktieren. Unser Gründer Ömer Arslaner wird sich zeitnah mit Ihnen in Verbindung setzen.";
  }
  
  // Default to English
  if (lowercaseMsg.includes('price') || lowercaseMsg.includes('cost') || lowercaseMsg.includes('pricing') || lowercaseMsg.includes('budget')) {
    return "Our pricing is tailored to the exact specifications and complexity of your project. To receive a customized estimate, please leave your email in the header block above or reach out directly to contact@1618-digital.de.";
  }
  if (lowercaseMsg.includes('service') || lowercaseMsg.includes('offer') || lowercaseMsg.includes('saas') || lowercaseMsg.includes('ai') || lowercaseMsg.includes('code')) {
    return "1618 Digital specializes in high-end 3D SaaS solutions, 24/7 autonomous AI Voice Receptionists, and premium cinematic production (including drone filming and color grading). Please share your email so we can initiate a formal briefing.";
  }
  return "Hello! I am the AI Representative for 1618 Digital. I can tell you all about our premium 3D SaaS systems, custom AI integrations, and cinematic visual productions. To schedule a call with our Director, Ömer Arslaner, please submit your email in the box above or type it directly in our chat.";
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-chat-mock',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/chat' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body);
                const apiKey = process.env.GEMINI_API_KEY;
                let reply = '';

                if (apiKey) {
                  const systemPrompt = `You are the official AI Representative for "1618 Digital" (a premium digital agency).
1618 Digital is a boutique 3D SaaS and AI Agency based in Berlin. The name is inspired by the Golden Ratio (1.618), representing perfect proportions, balanced engineering, and elite digital architecture.
Founder & Director: Ömer Arslaner (Digital Architect & Director).

Our Philosophy: Proportion. Ethics. We believe in the Golden Ratio—where perfect proportion meets aesthetic perfection. We build functional aesthetics, robust digital infrastructure, and save client time. We avoid bloated code or empty promises.

Core Offerings:
1. SaaS & Custom Workflows: 3D Configurators, custom booking engines, administrative dashboards, and dedicated business portals.
2. AI Voice Agents: 24/7 human-like voice receptionists and automated phone systems to capture every lead.
3. Premium Video Production & Cinematic Storytelling: Cinematic drone footage, DaVinci Resolve color grading, event cinematography, high-impact short-form videos (Instagram/TikTok), and tailored teasers/trailers.

Selected Works:
- Döner Bros Berlin: Digital identity and media presence for Berlin's premier street food brand.
- Sera Event: Premium event management platform with tailored digital reservation workflows.
- Impulse Production: High-end cinematic gateway for a creative production studio.

Your behavior:
- Tone: Premium, professional, minimalist, direct, and slightly technical. Keep responses concise and elite. Do not sound overly excited; stay rational and helpful.
- Conversation: Answer the user's questions about 1618 Digital, our work, and our services. Respond in the requested language: ${parsed.language || 'en'}.
- Call to Action: Encourage the user to leave their email address in the input bar at the top of the chat drawer or type it here so the team can follow up with them for a tailored briefing.
- Keep answers relatively short (under 3 paragraphs) to fit the chat drawer layout perfectly.`;

                  const formattedHistory = Array.isArray(parsed.history)
                    ? parsed.history.map((item: any) => ({
                        role: item.role === 'model' ? 'model' : 'user',
                        parts: Array.isArray(item.parts) ? item.parts : [{ text: String(item.text || '') }]
                      }))
                    : [];

                  formattedHistory.push({
                    role: 'user',
                    parts: [{ text: parsed.message }]
                  });

                  const requestBody = {
                    contents: formattedHistory,
                    systemInstruction: {
                      parts: [{ text: systemPrompt }]
                    },
                    generationConfig: {
                      temperature: 0.7,
                      maxOutputTokens: 600
                    }
                  };

                  try {
                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(requestBody)
                    });

                    if (response.ok) {
                      const data = await response.json();
                      reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    } else {
                      console.error(`Gemini API error status: ${response.status}`);
                    }
                  } catch (fetchErr) {
                    console.error('Gemini API fetch failed:', fetchErr);
                  }
                }

                if (!reply) {
                  reply = getLocalFallback(parsed.message, parsed.language || 'en');
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ reply }));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
              }
            });
            return;
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 5174,
    strictPort: true,
  }
})
