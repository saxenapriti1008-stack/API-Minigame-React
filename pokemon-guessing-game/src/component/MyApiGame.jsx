import { useEffect, useState } from "react";


  function MyApiGame() {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);

  // Sound effects

  const correctSound = new Audio("/sounds/correct.wav");
  const wrongSound = new Audio("/sounds/wrong.wav");
  const revealSound = new Audio("/sounds/reveal.wav");

// Fetch random Pokemon

  function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * 151) + 1; 
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data);
        setGuess("");
        setResult("");
        setRevealed(false);
      });
  }

  useEffect(() => {
    fetchRandomPokemon();
  }, []) }