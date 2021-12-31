export const defaultNotesToRender = [
  {
    note: "C",
    octave: "4",
    key: "a",
    hasSharp: true,
    timing: "8",
  },
  {
    note: "D",
    octave: "4",
    key: "s",
    hasSharp: true,
    timing: "8",
  },
  {
    note: "E",
    octave: "4",
    key: "d",
    hasSharp: false,
    timing: "8",
  },
  {
    note: "F",
    octave: "4",
    key: "f",
    hasSharp: true,
    timing: "8",
  },
  {
    note: "G",
    octave: "4",
    key: "g",
    hasSharp: true,
    timing: "8",
  },
  {
    note: "A",
    octave: "4",
    key: "h",
    hasSharp: true,
    timing: "8",
  },
  {
    note: "B",
    octave: "4",
    key: "j",
    hasSharp: false,
    timing: "8",
  },
  {
    note: "C",
    octave: "5",
    key: "k",
    hasSharp: true,
    timing: "8",
  },
];
export const notesPlusSharps = (noteArr, keyArr) => {
  const notes = [];
  noteArr.forEach((note, i) => {
    notes.push(note);
    // notes[i].key = keyArr[i];
    note.hasSharp &&
      notes.push({
        note: note.note + "#",
        octave: note.octave,
        timing: note.timing,
      });
  });
  notes.forEach((note, i) => {
    note.key = keyArr[i];
  });
  notes.splice(-1);
  return notes;
};
export const keyCodes = [
  "a",
  "w",
  "s",
  "e",
  "d",
  "f",
  "t",
  "g",
  "y",
  "h",
  "u",
  "j",
  "k",
];
