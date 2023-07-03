import { useState, useEffect } from 'react';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const itemTypes = [
    { value: '', label: 'Choose the item type' },
    { value: 'book', label: 'Book' },
    { value: 'media', label: 'Audio or Video' },
    { value: 'digital', label: 'Digital books or digital audiobooks' },
    { value: 'other', label: 'Other' },
  ]

  const sampleUsers = [
    { name: 'John Doe', barcode: '0001', patronType: 'Full', email: 'test@gmail.com' },
    { name: 'Jane Doe', barcode: '0002', patronType: 'Limited', email: '' },
    { name: 'John Smith', barcode: '0003', patronType: 'Recip', email: 'test@gmail.com' },
    { name: 'Jason Allen', barcode: '0007', patronType: 'Staff', email: 'jallend1@gmail.com' }
  ]

  const [errorMessage, setErrorMessage] = useState('');

  const [mediaType, setMediaType] = useState('');
  const [patronBarcode, setPatronBarcode] = useState('');
  const [currentPatron, setCurrentPatron] = useState({});
  const [knownISBN, setKnownISBN] = useState(false);

  const handleItemTypeChange = (event) => {
    setMediaType(event.target.value);
  }

  const handleCardNumberChange = (event) => {
    setPatronBarcode(event.target.value);
    if (event.target.value.length === 4) {
      sampleUsers.find((user) => {
        if (user.barcode === event.target.value) {
          setCurrentPatron(user);
        }
      });
    }
  }

  const handlePreviousClick = () => {
    setCurrentQuestion(currentQuestion - 1);
  }

  const handleNextClick = () => {
    setCurrentQuestion(currentQuestion + 1);
  }

  useEffect(() => {
    if (mediaType === 'digital') {
      setErrorMessage("Terrific! Digital items need to be requested through our Libby app. Sending you there in 5 seconds...");
    }
    else if (patronBarcode.length !== 4 && patronBarcode.length !== 0) {
      setErrorMessage("Please enter a valid library card number");
    }
    else if (patronBarcode.length === 4 && !currentPatron.name) {
      setErrorMessage("We can't find a patron with that barcode. Please try again.");
    }
    else {
      setErrorMessage('');
    }
  }, [mediaType, patronBarcode]);

  // Makes active tab visible
  useEffect(() => {
    const tabs = document.querySelectorAll('.form-tab');
    tabs.forEach((tab, index) => {
      if (index === currentQuestion) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }, [currentQuestion]);


  return (
    <div className="App">
      <main className="container">
        <form>
          <div className="form-tab">
            <div className="form-tab-header-title">
              <label htmlFor="item-type">What type of item are you suggesting?</label>
              <select className="form-select"
                aria-label="Item Type"
                id="item-type"
                value={mediaType}
                onChange={handleItemTypeChange}  >
                {itemTypes.map((itemType) => (
                  <option key={itemType.value} value={itemType.value}>{itemType.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-tab">
            <div className="form-tab-header-title">
              <label htmlFor="item-title">Your Library Barcode</label>
              <input type="text" className="form-control" id="patron-barode" placeholder="Your Library Barcode" onChange={handleCardNumberChange} value={patronBarcode} />
              <div className="form-text">
                Don't have a library card yet? Sign up online right <a href="www.google.com">here</a>!
              </div>
            </div>
          </div>
          <div className="form-tab">
            <div className="form-tab-header-title">
              <h3>Do you know the ISBN?</h3>
              <div className="form-check">
                <button type="button" className="btn btn-primary">Yes</button>
                <button type="button" className="btn btn-primary">No</button>
              </div>
            </div>
          </div>
          <div className="form-navigation">
            <button type="button" className="btn btn-primary" onClick={handlePreviousClick}>Previous</button>
            <button type="button" className="btn btn-primary" onClick={handleNextClick}>Next</button>
          </div>



        </form>
        {errorMessage &&
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        }

      </main>
    </div>
  );
}

export default App;
