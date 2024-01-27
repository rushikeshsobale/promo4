import React, { useState } from 'react';
import './style.css'
import Mybtn from './Btn'
export default function Aside() {

  const [flag, setflag] = useState(false)

  const style = {
    height: flag ? '100%' : '00', 
    ///maxheight: flag ? '100px' : '0',
    overflow: 'hidden',
    transition: 'height 1s',
  }

  let handleClick = () => {

    setflag(!flag)
  }

  return (
    <>
     
      <div className="Dropdown" style={style}>

        <div className={`bg-dark d-flex flex-column px-4  justify-content-center sticky-top`} >
          {/* Dropdown items go here */}
          <div className="container">
            <div className=" row lbr  px-2 py-5 ">
            <h3 className="text-white text-center">LIBRARY</h3>
              <div className="col-12 col-sm-6 col-lg-3 text-white my-3 " href="#">
                <a href="#">
                  <h1>Fiction</h1> 
                  <p>Fiction is any creative work, chiefly any narrative work, portraying individuals, events, or places that are imaginary or in ways that are imaginary.</p>
                </a>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 text-white my-3 " href="#">
                <a href="#">
                  <h1>Non-Fiction</h1>
                  <p>Non-fiction is any document or media content that attempts, in good faith, to convey information only about the real world, rather than being grounded in imagination.</p>
                </a>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 text-white my-3 " href="#">
                <a href="#">
                  <h1>Sci-Fiction</h1>
                  <p>Science fiction is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life.</p>
                </a>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 text-white my-3 " href="#">
                <a href="#">
                  <h1>History Books</h1>
                  <p>Historical fiction is a literary genre in which a fictional plot takes place in the setting of particular real historical events. </p>
                </a>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 text-white my-3 " href="#">
                <a href="#">
                  <h1>Fantasy</h1>
                  <p>Fantasy literature is literature set in an imaginary universe, often but not always without any locations, events, or people from the real world.</p>
                </a>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 text-white my-3 " href="#">
                <a href="#">
                  <h1>Novels</h1>
                  <p>A novel is a relatively long work of narrative fiction, typically written in prose and published as a book.</p>
                </a>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 text-white my-3 " href="#">
                <a href="#">
                  <h1>Biography</h1>
                  <p>A biography, or simply bio, is a detailed description of a person's life. It involves more than just basic facts like education, work, relationships, and death</p>
                </a>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 text-white my-3 " href="#">
                <a href="#">
                  <h1>Literacy Fiction</h1>
                  <p>Literary fiction, mainstream fiction, non-genre fiction, serious fiction, high literature, artistic literature, and sometimes just literature are labels that, in the book trade, refer to market novels</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

