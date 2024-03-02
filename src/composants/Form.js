import React, { useState, useRef, useEffect } from 'react';


 function Form() {
  const [allMemes, setAllMemes] = useState([]);
  const [memeImage, setmemeImage] = useState({
    topText: "",
    bottomText: "",
    image: "http://i.imgflip.com/1bij.jpg",
  });

  const canvasRef = useRef(null);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = memeImage.image;
    img.setAttribute('crossorigin', 'anonymous');
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(memeImage.topText, canvas.width / 2, 30);
      ctx.fillText(memeImage.bottomText, canvas.width / 2, canvas.height - 20);
    };
  }, [memeImage]);

  function getMemeImage() {
    var meme1 = allMemes;
    meme1 = meme1[Math.floor(Math.random() * meme1.length)];
    meme1 = meme1.url;
    return meme1;
    // console.log(results);
    // return memeObj;
  }

 

  function changeMeme(event) {
    const { name, value } = event.target;
    setmemeImage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(meme);
  }
  function handleSubmit(event) {
    event.preventDefault();
    // console.log(memeImage);
    setmemeImage((prevState) => ({
      ...prevState,
      image: getMemeImage(),
    }));
  }


    // function downloadMeme() {
    //     const link = document.createElement("a"); 
    //     link.href = memeImage.image; 
    //     const timestamp = new Date().getTime();
    //     link.download = `meme${timestamp}.jpg`;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);

    //     // link.download = "meme.jpg"; 
    //     // link.click(); 
    //   }

    function downloadMeme() {
      const canvas = canvasRef.current;
      const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      
      const link = document.createElement('a');
      link.download = 'mon-meme.png';
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    return (
      <main className='container-gle'>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input"
          placeholder="Meme top text"
          name="topText"
          value={memeImage.topText}
          onChange={changeMeme}
        />
        <input
          type="text"
          className="form-input"
          placeholder="Meme bottom text"
          name="bottomText"
          value={memeImage.bottomText}
          onChange={changeMeme}
        />
        <button className="form-button">Generate Meme</button>
      </form>
      <div className="meme">
        <img src={memeImage.image} alt="meme" className="meme--image"/>
        <h1 className="meme--text top">{memeImage.topText}</h1>
        <h1 className="meme--text bottom">{memeImage.bottomText}</h1>
      </div>
        <div>
         <button className="button-down" onClick={downloadMeme}>Télécharger Meme</button> 
        </div> 
          <div>
          <canvas style={{ display: 'none' }} ref={canvasRef}></canvas>
          </div>
      </main>
    );
};

export default Form;