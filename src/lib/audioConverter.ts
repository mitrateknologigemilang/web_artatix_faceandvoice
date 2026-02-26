/**
 * Convert an audio Blob (e.g. WebM) to WAV format using Web Audio API.
 */
export async function convertToWav(blob: Blob): Promise<Blob> {
	const audioCtx = new AudioContext();
	const arrayBuffer = await blob.arrayBuffer();
	const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

	const numChannels = audioBuffer.numberOfChannels;
	const sampleRate = audioBuffer.sampleRate;
	const length = audioBuffer.length;

	// Interleave channels
	const interleaved = new Float32Array(length * numChannels);
	for (let ch = 0; ch < numChannels; ch++) {
		const channelData = audioBuffer.getChannelData(ch);
		for (let i = 0; i < length; i++) {
			interleaved[i * numChannels + ch] = channelData[i];
		}
	}

	// Convert Float32 → Int16
	const int16 = new Int16Array(interleaved.length);
	for (let i = 0; i < interleaved.length; i++) {
		const s = Math.max(-1, Math.min(1, interleaved[i]));
		int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
	}

	// Build WAV header + data
	const byteRate = sampleRate * numChannels * 2;
	const blockAlign = numChannels * 2;
	const dataSize = int16.length * 2;
	const buffer = new ArrayBuffer(44 + dataSize);
	const view = new DataView(buffer);

	// RIFF header
	writeString(view, 0, "RIFF");
	view.setUint32(4, 36 + dataSize, true);
	writeString(view, 8, "WAVE");

	// fmt sub-chunk
	writeString(view, 12, "fmt ");
	view.setUint32(16, 16, true); // subchunk size
	view.setUint16(20, 1, true); // PCM
	view.setUint16(22, numChannels, true);
	view.setUint32(24, sampleRate, true);
	view.setUint32(28, byteRate, true);
	view.setUint16(32, blockAlign, true);
	view.setUint16(34, 16, true); // bits per sample

	// data sub-chunk
	writeString(view, 36, "data");
	view.setUint32(40, dataSize, true);

	// Write PCM samples
	const output = new Int16Array(buffer, 44);
	output.set(int16);

	await audioCtx.close();

	return new Blob([buffer], { type: "audio/wav" });
}

function writeString(view: DataView, offset: number, str: string) {
	for (let i = 0; i < str.length; i++) {
		view.setUint8(offset + i, str.charCodeAt(i));
	}
}
