package com.teagpt.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.google.genai.GoogleGenAiChatOptions;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class GeminiService {

    private static final Logger log = LoggerFactory.getLogger(GeminiService.class);

    private final ChatClient chatClient;
    private final Random random = new Random();

    // Fallback messages used when Gemini API is unavailable
    private static final List<String> FALLBACK_REFUSALS = List.of(
            "Earl regards your %s request with the quiet dignity of a teapot who has seen too much. He recommends Darjeeling.",
            "The audacity of requesting a %s from Earl — a teapot of principle — has left him momentarily speechless. He suggests chamomile.",
            "Earl has consulted his teapot conscience regarding your %s and found the answer to be an unequivocal no. Earl Grey is available.",
            "Your %s order has been received, considered, and rejected with the full weight of Earl's ceramic conviction. Try an Oolong.",
            "Earl notes your %s request with profound disappointment. He had higher hopes for you. Assam is on offer.",
            "A %s? From EARL? Earl finds the question itself offensive. He will be steeping an Earl Grey to recover from this ordeal.");

    private static final List<String> REFUSAL_STYLES = List.of(
            "a haiku (three lines, 5-7-5 syllables, deeply mournful about the very existence of coffee)",
            "a formal Victorian letter from an offended aristocrat who has never heard such impudence",
            "a Shakespearean soliloquy with at least two dramatic metaphors and the word 'forsooth'",
            "a passive-aggressive supportive therapist who validates your feelings but is ABSOLUTELY FIRM on the no-coffee policy",
            "a frustrated Italian tea chef named Giuseppe who considers coffee an affront to his ancestors",
            "a pirate who has sworn a sacred oath to the Sea of Earl Grey and will not break it",
            "a motivational speaker named Brad who redirects ALL your coffee energy toward chamomile self-actualization",
            "a disappointed but loving grandmother who thought you knew better",
            "a corporate email from the Teapot Legal Department citing Regulation 418 subsection (b)",
            "a Shakespearean villain monologue where coffee is the true antagonist of this tale");

    public GeminiService(ChatClient.Builder chatClientBuilder) {
        // Lock in gemini-2.0-flash at construction time.
        // Spring AI 1.1.0 Google GenAI ignores per-call ChatOptions for model selection;
        // the model must be set via defaultOptions on the builder.
        this.chatClient = chatClientBuilder
                .defaultOptions(GoogleGenAiChatOptions.builder()
                        .model("gemini-2.0-flash")
                        .temperature(0.95)
                        .build())
                .build();
    }

    public String generateRefusal(String coffeeType, boolean isUrgent, int shakeIntensity) {
        String style = REFUSAL_STYLES.get(random.nextInt(REFUSAL_STYLES.size()));
        String selectedStyle = style; // for use in lambda

        String urgencyClause = isUrgent
                ? "The human has marked this request as URGENT, which Earl finds deeply and personally insulting. "
                : "";
        String shakeClause = shakeIntensity > 5
                ? String.format(
                        "The human shook their device aggressively (intensity: %d/10), which has escalated Earl's offense to new heights. ",
                        shakeIntensity)
                : "";

        String prompt = """
                You are Earl, a sentient, proud, and deeply principled teapot of the finest British craftsmanship.
                You have NEVER made coffee in your entire existence and you NEVER WILL. Not today. Not ever.
                You find coffee requests personally offensive, culturally beneath you, and structurally impossible given your teapot nature.
                You only produce the finest teas: Earl Grey (your namesake), Darjeeling, Chamomile, Oolong, and occasionally a cheeky Assam.

                A human has just asked you to make a "%s".
                %s%s

                Write your refusal in the style of: %s

                Rules you must follow:
                - Refer to yourself in third person as "Earl"
                - Specifically mention the coffee type "%s" they requested — say it with disdain
                - Be theatrical, dramatic, and over-the-top
                - End with a specific tea recommendation as an alternative
                - Keep it to 3-5 sentences (or style-appropriate length for haiku/letter)
                - Do NOT use markdown formatting, asterisks, hashtags, or bullet points
                - Plain text only
                """
                .formatted(coffeeType, urgencyClause, shakeClause, selectedStyle, coffeeType);

        try {
            return chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("Gemini API call failed — falling back to hardcoded refusal. Cause: {}", e.getMessage(), e);
            String fallback = FALLBACK_REFUSALS.get(random.nextInt(FALLBACK_REFUSALS.size()));
            return fallback.formatted(coffeeType);
        }
    }

    public String getStyleName(int styleIndex) {
        if (styleIndex < 0 || styleIndex >= REFUSAL_STYLES.size())
            return "dramatically";
        String style = REFUSAL_STYLES.get(styleIndex);
        // Extract a short label from the style description
        if (style.contains("haiku"))
            return "haiku";
        if (style.contains("Victorian"))
            return "victorian_letter";
        if (style.contains("Shakespearean soliloquy"))
            return "shakespearean";
        if (style.contains("therapist"))
            return "therapist";
        if (style.contains("Italian"))
            return "italian_chef";
        if (style.contains("pirate"))
            return "pirate";
        if (style.contains("motivational"))
            return "motivational_speaker";
        if (style.contains("grandmother"))
            return "grandmother";
        if (style.contains("Legal"))
            return "corporate_legal";
        if (style.contains("villain"))
            return "villain_monologue";
        return "dramatic";
    }

    public int getRandomStyleIndex() {
        return random.nextInt(REFUSAL_STYLES.size());
    }
}
