import { useState } from "react"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackData from "./data/Feedbackdata"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackForm from "./components/FeedbackForm"
import { v4 as uuidv4} from "uuid"
import AboutPage from "./pages/AboutPage"
import Post from "./components/Post"
import AboutIconLink from "./components/AboutIconLink"
import {FeedbackProvider} from "./context/FeedbackContext"

function App() {
    const [feedback, setFeedback] = useState(FeedbackData)
    const addFeedback = (newFeedback) => {  newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
        console.log(newFeedback)
    }
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete ?')) {
            setFeedback(feedback.filter((item)=> item.id !== id))
        }
        
    }
 
    return (
        <FeedbackProvider>
            <Router>
            <Header />
            <div className='container'>
                <Routes>
                    <Route exact path='/' element={
                        <>
                        <FeedbackForm handleAdd={addFeedback} />
                        {/* <FeedbackStats feedback={feedback} /> */}
                        <FeedbackStats />
                        {/* <FeedbackList  feedback={feedback} handleDelete= {deleteFeedback}/> */}
                        <FeedbackList  handleDelete= {deleteFeedback}/>

                        </>
                    } >
                        
                    </Route>
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/post/*' element={<Post />} />
                </Routes>
                {/* <Card>
                    <NavLink to='/' activeClassName='active' > Home </NavLink>
                    <NavLink to='/about' activeClassName='active' > About </NavLink>
                </Card> */}
                <AboutIconLink />
            </div>
        </Router>
        </FeedbackProvider>
        
    )
}

export default App