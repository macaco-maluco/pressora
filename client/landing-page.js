import React from 'react'
import ReactDOM from 'react-dom'
import { App, Page, Section, Hero } from 'neal-react'
import './landing-page.scss'
import background from './background.jpg'

function startGame () {
  var playerName = document.getElementById('player-name').value
  document.location.href = `/game.html?playerName=${playerName}`
}

ReactDOM.render((
  <App>
    <Page>
      <Hero backgroundImage={background} className='text-center'>
        <h1 className='display-1'> Pressora </h1>
        <p className='lead'>Control your battleships remotely while dealing with the latency of space battles!</p>
        <p className='text-center'>
          <input id='player-name' type='text' placeholder='Your name' className='form-control'/>
        </p>
        <p>
          <button onClick={startGame} className='btn btn-white'>
            Play
          </button>
          <span className='btn btn-white btn-vote'>
            <iframe src='http://nodeknockout.com/iframe/macaco-frito'
                    frameBorder={0}
                    scrolling='no'
                    allowTransparency='true'
                    width={115} height={25} />
          </span>
        </p>
      </Hero>

      <Section heading='In the age of 3D printers'>
        <p>It is the future! 3D printers are a commodity and SpaceX has finally made launching stuff into space affordable.</p>
        <p>So bored kids start to build battleships and fighting in space.</p>
      </Section>

       <Section heading='Built with love' className='gray'>
        <p>Graphic art provided by <a href='http://opengameart.org/content/space-game-art-pack-extended'>Tatermand</a></p>
        <p>Buttons provided by <a href='http://opengameart.org/content/game-icons-expansion'>Kenney</a></p>
      </Section>
    </Page>
  </App>
), document.getElementById('main'))
