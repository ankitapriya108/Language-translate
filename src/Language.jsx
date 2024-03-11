import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Language.css'

function Language() {

    const [sourceLanguage, setSourceLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [languages, setLanguages] = useState([]);
       

    const API_KEY = 'de1c952b3dmshd8b02e64015dd00p1d7590jsn1757c74db76b';
    const API_URL = 'https://text-translator2.p.rapidapi.com/getLanguages';

  
                 
      useEffect(() => {
        axios.get(API_URL)
          .then(response => {
            const supportedLanguages = response.data.data.languages;
            setLanguages(supportedLanguages);
          })
          .catch(error => {
            console.error('Error fetching supported languages:', error);
          });
      }, []);


      const translateText = async () => {
        try {
            const response = await axios.post('https://text-translator2.p.rapidapi.com/getLanguages', {
                q: inputText,
                source: sourceLanguage,
                target: targetLanguage,
              });
              
    
          const translation = response.data.data.translations[0].translatedText;
          setTranslatedText(translation);
        } catch (error) {
          console.error('Error translating text:', error);
        }
      };
           
  return (
    <>
    <div className='head'>
        <h1>Language Translator</h1>
        <div className='first'>
        <label htmlFor="dropdown">Source language: </label>
        <select name="" id="language" value={sourceLanguage}   onChange={(e) => setSourceLanguage(e.target.value)}>
        <option value="">Select source language</option>
          {languages.map(lang => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
           
        </select>
            
        </div>
        <div className='second'>
        <label htmlFor="dropdown">Target language: </label>
        <select name="" id="language" value={targetLanguage} onChange={(e)=>setTargetLanguage(e.target.value)}>
        <option value="">Select target language</option>
          {languages.map(lang => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
         
        </select>
        </div>
        <div className='third'>
        <label>Enter text:</label>
        <textarea value={inputText} 
        onChange={(e) => setInputText(e.target.value)}
         placeholder="Enter text...">
         </textarea>

        </div>
        <button onClick={translateText}>Translate</button>

        <p>Translated Text: {translatedText}</p>

    </div>
    </>
  )
}

export default Language