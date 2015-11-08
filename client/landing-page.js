import React from 'react'
import ReactDOM from 'react-dom'
import { App, Page, Section, Hero } from 'neal-react'
import './landing-page.scss'
import background from './background.jpg'

ReactDOM.render((
  <App>
    <Page>
      <Hero backgroundImage={background}
        className='text-center'>
        <h1 className='display-1'> Turn based space battles </h1>
        <p className='lead'>Control your battleships remotely while dealing with the latency of space battles!</p>
        <p>
          <a href='game.html' className='btn btn-white'>
            Play
          </a>
        </p>
      </Hero>

      <Section heading='In the age of 3D printers'>
        <p>It is the future! 3D printers are a commodity and SpaceX has finally made launching stuff in space affordable.</p>
        <p>So bored kids start to build battleships and fighting in space.</p>
      </Section>

       <Section heading='Built with love' className='gray'>
        <p>Graphic art was provided by <a href='http://opengameart.org/content/space-game-art-pack-extended'>Tatermand</a></p>
        <p>Buttons was provided by <a href='http://opengameart.org/content/game-icons-expansion'>Kenney</a></p>
      </Section>
    </Page>
  </App>
), document.getElementById('main'))
