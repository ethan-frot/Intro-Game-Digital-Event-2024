export default async function vocalQuestionAssistant(message) {
    const url = 'https://api.elevenlabs.io/v1/text-to-speech/Ivcv0VPP23skQpvzJBrp';
    const apiKey = '5f0451d7f1c9f478e89dd6f96e162997'; // Remplacez par votre clé API
    const data = {
        text: message,
        voice_settings: {
            use_speaker_boost: true,
            similarity_boost: 1,
            stability: 1,
            style: 0.5
        },
        model_id: "eleven_multilingual_v2"
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xi-api-key': apiKey
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        const audioElement = document.querySelector('audio');
        const blob = await response.blob();
        const audioURL = window.URL.createObjectURL(blob);
        audioElement.src = audioURL;
        audioElement.play().catch(error => console.error("Playback failed:", error));
    }
}

