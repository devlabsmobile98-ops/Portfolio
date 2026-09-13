import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Pause, Play, Square } from 'lucide-react';

export default function AccessibilityReader() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Keeps track of whether the user intentionally stopped reading.
  const shouldContinueRef = useRef(false);

  useEffect(() => {
    const supported =
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      'SpeechSynthesisUtterance' in window;

    setIsSupported(supported);

    return () => {
      shouldContinueRef.current = false;

      if (supported) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /*
   * Choose the clearest English voice available on the user's device.
   */
  const getBestVoice = () => {
    const voices = window.speechSynthesis.getVoices();

    const preferredVoiceNames = [
      'Microsoft Aria',
      'Microsoft Jenny',
      'Microsoft Ava',
      'Samantha',
      'Google US English',
      'Google UK English Female',
      'Karen',
      'Moira',
    ];

    // Prefer known natural-sounding voices.
    for (const preferredName of preferredVoiceNames) {
      const voice = voices.find((v) =>
        v.name.toLowerCase().includes(preferredName.toLowerCase())
      );

      if (voice) {
        return voice;
      }
    }

    // Then prefer Canadian English.
    const canadianVoice = voices.find(
      (voice) => voice.lang?.toLowerCase() === 'en-ca'
    );

    if (canadianVoice) {
      return canadianVoice;
    }

    // Finally, use any English voice.
    const englishVoice = voices.find((voice) =>
      voice.lang?.toLowerCase().startsWith('en')
    );

    return englishVoice || null;
  };

  /*
   * Extract readable content from the portfolio.
   */
  const getPageText = () => {
    const main = document.querySelector('main');

    if (!main) return [];

    const clone = main.cloneNode(true);

    // Remove controls and decorative content.
    clone
      .querySelectorAll(
        'button, nav, script, style, [aria-hidden="true"], [data-no-read]'
      )
      .forEach((element) => element.remove());

    const elements = clone.querySelectorAll(
      'h1, h2, h3, p, li, article'
    );

    const chunks = [];

    elements.forEach((element) => {
      const text = element.innerText
        ?.replace(/\s+/g, ' ')
        .trim();

      if (!text) return;

      /*
       * Don't separately read an article if its contents
       * are already being captured by its headings/paragraphs.
       */
      if (
        element.tagName.toLowerCase() === 'article' &&
        element.querySelector('h1, h2, h3, p, li')
      ) {
        return;
      }

      chunks.push({
        text,
        isHeading: /^H[1-3]$/.test(element.tagName),
      });
    });

    return chunks;
  };

  const startReading = () => {
    if (!isSupported) return;

    window.speechSynthesis.cancel();

    const chunks = getPageText();

    if (!chunks.length) return;

    const voice = getBestVoice();

    let index = 0;

    // Tell the reader that it should continue through the entire page.
    shouldContinueRef.current = true;

    const speakNext = () => {
      // User pressed Stop.
      if (!shouldContinueRef.current) {
        return;
      }

      // We reached the end of the page.
      if (index >= chunks.length) {
        setIsSpeaking(false);
        setIsPaused(false);
        shouldContinueRef.current = false;
        return;
      }

      const chunk = chunks[index];

      const utterance = new SpeechSynthesisUtterance(chunk.text);

      if (voice) {
        utterance.voice = voice;
      }

      utterance.lang = voice?.lang || 'en-CA';

      // Slightly slower and clearer.
      utterance.rate = chunk.isHeading ? 0.85 : 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        // Move to the next piece of content.
        index += 1;

        /*
         * Don't check speechSynthesis.speaking here.
         * The current utterance has JUST finished, so that
         * property may already be false.
         */
        if (!shouldContinueRef.current) {
          return;
        }

        /*
         * Give headings and sections a slightly longer pause.
         * This makes the portfolio sound more like a person
         * reading a structured page.
         */
        const pauseLength = chunk.isHeading ? 350 : 120;

        setTimeout(() => {
          if (shouldContinueRef.current) {
            speakNext();
          }
        }, pauseLength);
      };

      utterance.onerror = (event) => {
        /*
         * 'canceled' is expected when the user presses Stop.
         * Don't treat that as an actual error.
         */
        if (event.error === 'canceled') {
          return;
        }

        shouldContinueRef.current = false;
        setIsSpeaking(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  const pauseReading = () => {
    if (!isSupported) return;

    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resumeReading = () => {
    if (!isSupported) return;

    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const stopReading = () => {
    if (!isSupported) return;

    // Prevent the next chunk from starting.
    shouldContinueRef.current = false;

    window.speechSynthesis.cancel();

    setIsSpeaking(false);
    setIsPaused(false);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div
      className="flex items-center gap-2"
      aria-label="Accessibility reading controls"
    >
      {!isSpeaking ? (
        <button
          type="button"
          onClick={startReading}
          aria-label="Read this page aloud"
          title="Read this page aloud"
          className="inline-flex items-center gap-2"
        >
          <Volume2
            aria-hidden="true"
            className="w-4 h-4"
          />

          <span>Text-to-Voice</span>
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={
              isPaused
                ? resumeReading
                : pauseReading
            }
            aria-label={
              isPaused
                ? 'Resume reading'
                : 'Pause reading'
            }
            title={
              isPaused
                ? 'Resume reading'
                : 'Pause reading'
            }
          >
            {isPaused ? (
              <Play
                aria-hidden="true"
                className="w-4 h-4"
              />
            ) : (
              <Pause
                aria-hidden="true"
                className="w-4 h-4"
              />
            )}

            <span className="sr-only">
              {isPaused
                ? 'Resume reading'
                : 'Pause reading'}
            </span>
          </button>

          <button
            type="button"
            onClick={stopReading}
            aria-label="Stop reading"
            title="Stop reading"
          >
            <Square
              aria-hidden="true"
              className="w-4 h-4"
            />

            <span className="sr-only">
              Stop reading
            </span>
          </button>
        </>
      )}
    </div>
  );
}