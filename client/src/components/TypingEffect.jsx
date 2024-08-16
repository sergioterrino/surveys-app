import { useEffect, useState } from "react";

/**
 * TypingEffect component
 *
 * Este componente muestra un efecto de escritura de texto, donde el texto se muestra
 * carácter por carácter a una velocidad específica. Una vez que el texto completo
 * se ha mostrado, se reinicia y comienza de nuevo en un bucle continuo.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.text - El texto que se mostrará con el efecto de escritura.
 * @param {number} props.speed - La velocidad a la que se mostrará cada carácter, en milisegundos.
 *
 * @returns {JSX.Element} Un elemento <span> que contiene el texto con el efecto de escritura.
 */
function TypingEffect({ text, speed }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]); // prev es el estado actual de dicha prop, el texto que había
      index++;
      if (index === text.length) {
        index = 0;
        setDisplayedText(""); // para que lo haga en loop
      }
    }, speed);

    return () => clearInterval(interval); // limpia el intervalo cuando el componente se desmonta
  }, [text, speed]);

  return <span>{displayedText}</span>;
}

export default TypingEffect;
