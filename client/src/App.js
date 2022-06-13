import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useStores } from './store/Root'

//Import components
import {Container, Row, Col} from 'react-bootstrap'
import AccordionComp from './components/Accordion'
import InputComp from './components/Input'
import Modal from './components/Modal'
import ToastComp from './components/Toast'

function App() {
  const { UserStore } = useStores();
  const [urlsData, setUrlsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newUrlMetaData, setNewUrlMetaData ] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);
  const [toastText, setToastText] = useState('');

  // Axios instance
  const instance = axios.create({
    baseURL: 'http://localhost:3005/',
    headers:{'Access-key': 'favoriteApp'}
  });

  // Add token
  if(UserStore.token) instance.defaults.headers.common['Authorization'] = `Barear ${UserStore.token}`

  useEffect(() => {
    // Fetch data only if UserStore is empty or diff from state
    const isEqual = UserStore.urlsMetaData.length > 0 &&
      (urlsData.length != UserStore.urlsMetaData ||
        UserStore.urlsMetaData.find((obj, index) => obj.value.metadata != urlsData[index].value.metadata))

    if (isEqual) return

    //Get URLS with metadata from api
    instance.get(`favoritesMetadata`)
      .then(res => {
        setIsListLoading(false)
        // Use URLS in 'fulfilled' status, mean has metadata
        const filteredData = res.data.values.filter(obj => (obj.status === "fulfilled"))
        UserStore.setData({
          key: 'urlsMetaData',
          value: filteredData
        })
        // Update state with URLS data
        setUrlsData(filteredData)

        // Save token
        UserStore.setData({
          key: 'token',
          value: res.data.token
        })
      })
  });
  // Add new URL
  function handleNewUrl(val) {
    setShowToast(false)
    setIsLoading(true)
    // Add URL to DB
    instance.post(`favorites`, {
        url: val
      })
      .then(res => {
        setIsLoading(false)
        const data = res.data;

        // If URL was not found, show Toast
        if (!data || !data.metaData || !data.metaData.metadata || Object.keys(data.metaData.metadata).length < 1) {
          setShowToast(true)
          setToastText('URL was not found')
          return
        }
        // Show Modal with URL metadata
        setNewUrlMetaData(data.metaData.metadata)
        setShowModal(true)

        //Add and set this new URL to store and state 
        const addData = urlsData
        const newUrlObj = {
          status: 'fulfilled',
          value: {
            metadata: data.metaData.metadata,
            socials: data.metaData.socials,
            favicons: data.metaData.favicons,
            id: data.metaData.id
          }
        }
        addData.push(newUrlObj)
        setUrlsData(addData)
        const storeMetaData = UserStore.urlsMetaData
        storeMetaData.push(newUrlObj)
        UserStore.setData({
          key: 'urlsMetaData',
          value: storeMetaData
        })
      })
      .catch((error) => {
        setIsLoading(false)
        setShowToast(true)
        setToastText('URL was not found')
      })
  }

  function handleClose(){
    setShowModal(false)
  }
  function closeToast(){
    setShowToast(false)
  }
  
  const deleteUrl = () => {
    setShowToast(false)
    // Get deleted ID 
    if(!UserStore.deleteUrl) return
    // Filtered this URL from state
    const filtered = urlsData.filter(obj => obj.value.id !== UserStore.deleteUrl)
    setUrlsData(filtered)
    // Delete URL from DB
    instance.delete(`favorites`, { 
      data: {id: UserStore.deleteUrl}
    })
    .then(res => {
      setShowToast(true)
      setToastText('URL was deleted successfully')
    })
    .catch((error) => {
      setShowToast(true)
      setToastText('URL was not deleted')
    })
  }

  return (
    <>
        <Container>
          <Row>
            <Col>
              <h1 className='text-center mt-3 mb-4'>
                Favorites list
              </h1>
            </Col>
          </Row>
          { isListLoading && 
          <Row className="justify-content-center">
            <Col className="text-center">
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </Col>
          </Row> }
          
          <Row className="justify-content-center">
            <Col xs={12} md={7} lg={5}>
              <Row>
                { urlsData && <AccordionComp urlsData={urlsData} parentCallback={deleteUrl} /> }
              </Row>
              <Row className="mt-5">
                { urlsData && <InputComp className="mt-5" urlsData={urlsData} parentCallback={handleNewUrl} isLoading={isLoading}/> }
              </Row>
            </Col>
            <Row>
              { showModal && <Modal data={newUrlMetaData} parentCallback={handleClose} showModal={showModal} /> }
            </Row>
          </Row>
          { showToast && <ToastComp showToast={showToast} closeToast={closeToast} position="bottom-end" variant="Warning" text={toastText}/> }
        </Container>
    </>
  );
}

export default App;
