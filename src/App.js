import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {

  const [formData, setFormData] = useState({})

  const [imageData, setImageData] = useState([])
  const [display, setDisplay] = useState("none")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const query = formData.query;

  const handleClick = () => {

    const options = {
      method: 'GET',
      url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
      params: { q: query, pageNumber: '1', pageSize: '10', autoCorrect: 'true' },
      headers: {
        'X-RapidAPI-Key': 'e1de50583fmsh62d90f9b37942eap1e3e29jsnc5210b9eccc2',
        'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      setImageData(response.data.value)
    }).catch(function (error) {
      console.error(error);
    });

    console.log(imageData)
  }
  return (
    <>
      <div className="main-div">

        <div className="header-div">
          <h1>React Photo Search</h1>
          <button>Bookmarks</button>
        </div>

        <div className="search-div">
          <form onClick={handleSubmit}>
            <input type="text" placeholder="Search free high resolution images"
              onChange={e => setFormData({ ...formData, query: e.target.value })} />
            <button onClick={handleClick}>Search</button>
          </form>
        </div>


      </div>
      <div className='images-div'>
        {
          imageData.map((image, index) => {
            return (
              <>
                <div>
                  <img src={image.url} />
                </div>

              </>
            )
          })
        }
      </div>
    </>
  );
}

export default App;
