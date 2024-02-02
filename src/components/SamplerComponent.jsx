import React, { useEffect } from 'react';
import * as Tone from 'tone';

const SamplerComponent = ({ notesToPlay }) => {
  useEffect(() => {
    // Create a sampler with mapping of note names to audio file URLs
    const sampler = new Tone.Sampler({
      urls: {
        C3: 'notes/single-piano-note-c3_60bpm_C_major.wav', // Replace with your actual audio files
        C4: 'notes/single-piano-note-c4_100bpm_C_major.wav',
        // Add more notes up to C8 as needed 
      },
      baseUrl: './../sounds', // Replace with your actual base URL
      onload: () => {
        // Trigger the attack and release for specified notes
        notesToPlay.forEach(({ noteName, octave, duration }) => {
          const fullNote = `${noteName}${octave}`;
          sampler.triggerAttackRelease(fullNote, duration);
        });
      },
    }).toDestination();

    // Load the samples
    sampler.load().then(() => {
      console.log('Samples loaded!');
    });

    // Cleanup on component unmount
    return () => {
      // Dispose of resources if needed
      sampler.dispose();
    };
  }, [notesToPlay]); // Re-run effect when notesToPlay changes

  return <div>Sampler Component</div>;
};

export default SamplerComponent;