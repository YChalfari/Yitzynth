import * as Tone from "tone";
import users from "../apis/users";
export const recordSong = (noteObj, arr, stateFunc) => {
  const newObj = { ...noteObj };
  newObj.time = Tone.Transport.seconds.toFixed(3);
  arr.push(newObj);
  stateFunc(arr);
};

export const playSong = (song, synth) => {
  Tone.start();
  const now = Tone.now();
  Tone.Transport.start();

  song.forEach((songNote) => {
    const { note, octave, timing, time } = songNote;
    synth.triggerAttackRelease(
      `${note}${octave}`,
      `${timing}n`,
      `${now + (time - Tone.Transport.seconds.toFixed(3))}`
    );
  });
  Tone.Transport.stop();
};

export const toggleState = (func, state) => {
  func((state) => !state);
};
