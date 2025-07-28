import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './LandingPage.css';
import logo from '../assets/logo.png';
import notesImg from '../assets/notesImg.jpg';
import dashBoardImg from '../assets/dashBoardImg.png';
import analytics from '../assets/analytics.png';
import organize from '../assets/organize.jpg';

function LandingPage() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <header className='d-flex justify-content-between mt-2'>
        <img src={logo} alt='App Logo' className='mr-2 logo-style' />

        <h1 className='display-5 fw-bold thq-heading-2'>
          Interview Notes Manager
        </h1>

        <div className='d-flex justify-content-center gap-3 mb-4 mt-2'>
          <button
            className='btn btn-primary btn-lg'
            onClick={() => navigate('/register')}
            style={{
              backgroundColor: isHovered ? '#6c757d' : '#ffebea',
              borderColor: '#5f7083',
              color: isHovered ? 'white' : '#5f7083',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Get Started
          </button>
          <button
            className='btn btn-outline-secondary btn-lg'
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        </div>
      </header>

      <hr className='horizontal-line'></hr>
      <p className='text-center thq-body-small bg-linen'>
        Organize your technical interview prep, save categorized notes, track
        your progress, and stay ready.
      </p>

      <div class='home-features1'>
        <div class='thq-section-padding'>
          <div class='features1-container1 thq-section-max-width'>
            <div class='features1-image-container'>
              <img
                alt='Search for Books'
                src={organize}
                class='features1-image thq-img-ratio-16-9'
              />
            </div>
            <div class='features1-tabs-menu'>
              <div class='features1-tab-horizontal'>
                <div class='features1-divider-container'>
                  <div class='features1-container2'></div>
                </div>
                <div class='features1-content'>
                  <h2 class='thq-heading-2'>Organize Everything</h2>
                  <span class='thq-body-small'>
                    Save notes under categories like DSA, System Design, HR,
                    Projects, etc.
                  </span>
                </div>
              </div>
              <div class='features1-tab-horizontal'>
                <div class='features1-divider-container'></div>
                <div class='features1-content'>
                  <h2 class='thq-heading-2'>Tag Smartly</h2>
                  <span class='thq-body-small'>
                    Use tags to filter notes easily during last-minute revision.
                  </span>
                </div>
              </div>
              <div class='features1-tab-horizontal'>
                <div class='features1-divider-container'></div>
                <div class='features1-content'>
                  <h2 class='thq-heading-2'>Track Progress</h2>
                  <span class='thq-body-small'>
                    Dashboard shows your note count, categories, and tags
                    visually.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='screenshots bg-white py-5'>
        <div className='container text-center'>
          <h2 className='font-weight-bold mb-4 thq-heading-2'>
            See it in Action
          </h2>
          <div className='row justify-content-center'>
            <div className='col-md-6 mb-3'>
              <img
                src={notesImg}
                alt='Notes Page'
                className='img-fluid rounded shadow'
              />
            </div>
            <div className='col-md-6 mb-3'>
              <img
                style={{ height: '50%' }}
                src={dashBoardImg}
                alt='Dashboard'
                className='img-fluid rounded shadow'
              />
              <br />
              <br />
              <img
                style={{ height: '45%' }}
                src={analytics}
                alt='analytics'
                className='img-fluid rounded shadow'
              />
            </div>
          </div>
        </div>
      </section>
      <section className='about py-5 bg-cornsilk'>
        <div className='container'>
          <h2 className='text-center mb-4 thq-heading-2'>
            Built For Learners, By a Learner
          </h2>
          <p className='text-center text-muted mx-auto thq-body-small'>
            I built this app while preparing for job interviews. I was tired of
            using Google Docs and Notion without structure.This is my way of
            helping others organize their prep journey with clean filters,
            visual analytics, and exportable content. It's simple, minimal, and
            focused entirely on productivity.
          </p>
        </div>
      </section>
      <footer className='footer text-white py-3 bg-gray'>
        <div className='container d-flex justify-content-between flex-wrap'>
          <div>© 2025 Interview Notes Manager</div>
          <div>
            <a href='mailto:udharanavya@gmail.com' className='text-white me-3'>
              Contact
            </a>
            <a href='https://github.com/Navya-U' className='text-white'>
              Github
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
