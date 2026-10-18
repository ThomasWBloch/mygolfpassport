'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// ── Install targets — update here when a new Android build is the tester link.
// iOS: public TestFlight link (anyone with it can join the external group).
// Android: direct EAS build page for the `preview` APK (no store).
const TESTFLIGHT_APP_URL = 'https://apps.apple.com/app/testflight/id899247664'
const TESTFLIGHT_JOIN_URL = 'https://testflight.apple.com/join/JYdnRksG'
const ANDROID_BUILD_URL =
  'https://expo.dev/accounts/my-golf-passport/projects/mygolfpassport/builds/92105276-befd-4614-a125-d16198817989'

type Platform = 'ios' | 'android'
type Detected = Platform | 'other'

const LAST_STEP = 3

function detectPlatform(): Detected {
  const ua = navigator.userAgent
  if (/android/i.test(ua)) return 'android'
  // iPadOS 13+ reports as a Mac but has touch points.
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) {
    return 'ios'
  }
  return 'other'
}

export default function BetaFlow() {
  const [step, setStep] = useState(0)
  const [detected, setDetected] = useState<Detected | null>(null)
  const [chosen, setChosen] = useState<Platform | null>(null)

  useEffect(() => {
    // Detection needs `navigator`, so it can only run after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDetected(detectPlatform())
  }, [])

  const platform: Platform | null = chosen ?? (detected === 'ios' || detected === 'android' ? detected : null)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BETA_CSS }} />
      <main className="bt">
        <header className="bt-top">
          <span className="bt-monogram">M</span>
          <span className="bt-brand">My Golf Passport</span>
          <span className="bt-badge">Beta</span>
        </header>

        <div className="bt-dots" aria-hidden="true">
          {Array.from({ length: LAST_STEP + 1 }, (_, i) => (
            <span key={i} className={i === step ? 'on' : i < step ? 'done' : ''} />
          ))}
        </div>

        <section className="bt-card" aria-live="polite">
          {step === 0 && (
            <>
              <div className="bt-eyebrow">Welcome, tester</div>
              <h1 className="bt-h">One stamp for every <em>course</em> you play.</h1>
              <p className="bt-p">
                Your personal record of every golf course you&apos;ve played. You&apos;re among the
                first to try it. In the app you can:
              </p>
              <ul className="bt-list">
                <li><b>Log</b> any course you&apos;ve played, from 36,000+ courses in 149 countries</li>
                <li><b>See</b> your golf journey fill in on a world map</li>
                <li><b>Earn</b> badges and compare with your golf buddies</li>
              </ul>
            </>
          )}

          {step === 1 && (
            <>
              <div className="bt-eyebrow">What we ask of you</div>
              <h1 className="bt-h">Log your <em>golf history</em>.</h1>
              <p className="bt-p">
                The more courses you add, the better we can test everything. Please:
              </p>
              <ul className="bt-list">
                <li>Add all the courses you can remember playing</li>
                <li>Try the map, badges and friends</li>
                <li>Tell us when anything looks off or breaks. Screenshots help!</li>
              </ul>
              <p className="bt-note">It takes about two minutes to get started.</p>
            </>
          )}

          {step === 2 && (
            <>
              <div className="bt-eyebrow">Install</div>
              <h1 className="bt-h">Get the <em>app</em>.</h1>

              <div className="bt-seg" role="tablist" aria-label="Your phone">
                <button
                  type="button"
                  role="tab"
                  aria-selected={platform === 'ios'}
                  className={platform === 'ios' ? 'on' : ''}
                  onClick={() => setChosen('ios')}
                >
                  iPhone
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={platform === 'android'}
                  className={platform === 'android' ? 'on' : ''}
                  onClick={() => setChosen('android')}
                >
                  Android
                </button>
              </div>

              {detected === 'other' && !chosen && (
                <p className="bt-note">
                  Open this page on your phone to install, or pick your phone type above.
                </p>
              )}

              {platform === 'ios' && (
                <ol className="bt-steps">
                  <li>
                    <span>Install <b>TestFlight</b>, Apple&apos;s free beta-testing app.</span>
                    <a className="bt-btn bt-btn-ghost" href={TESTFLIGHT_APP_URL} target="_blank" rel="noreferrer">
                      Get TestFlight
                    </a>
                  </li>
                  <li>
                    <span>Open the invite. It takes you to TestFlight, where you install the app.</span>
                    <a className="bt-btn bt-btn-gold" href={TESTFLIGHT_JOIN_URL} target="_blank" rel="noreferrer">
                      Install My Golf Passport
                    </a>
                  </li>
                </ol>
              )}

              {platform === 'android' && (
                <ol className="bt-steps">
                  <li>
                    <span>Open the download page and tap <b>Install</b>.</span>
                    <a className="bt-btn bt-btn-gold" href={ANDROID_BUILD_URL} target="_blank" rel="noreferrer">
                      Download for Android
                    </a>
                  </li>
                  <li>
                    <span>
                      Your phone may say the file &ldquo;may be harmful&rdquo;. That&apos;s normal for a
                      beta app. Tap <b>Download anyway</b>.
                    </span>
                  </li>
                  <li>
                    <span>
                      Allow installing from this source, and tap <b>Install anyway</b> if Google Play
                      Protect shows a warning.
                    </span>
                  </li>
                </ol>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <div className="bt-eyebrow">Last step</div>
              <h1 className="bt-h">Open the app and <em>log in</em>.</h1>
              <ul className="bt-list">
                <li>New here? Create your profile. It takes a minute.</li>
                <li>
                  Already signed up on the website? Log in with the <b>same email and password</b>.
                  No need for a new account.
                </li>
                <li>Forgot your password? Tap &ldquo;Forgot password&rdquo; on the login screen.</li>
              </ul>
              <p className="bt-note">
                Questions or problems? Just reply to the message that sent you here.
              </p>
            </>
          )}
        </section>

        <nav className="bt-nav">
          {step > 0 ? (
            <button type="button" className="bt-btn bt-btn-ghost" onClick={() => setStep(step - 1)}>
              Back
            </button>
          ) : (
            <span />
          )}
          {step < LAST_STEP ? (
            <button type="button" className="bt-btn bt-btn-gold" onClick={() => setStep(step + 1)}>
              {step === 0 ? "Let's go" : 'Next'}
            </button>
          ) : (
            <Link href="/welcome" className="bt-btn bt-btn-ghost">Visit the website</Link>
          )}
        </nav>
      </main>
    </>
  )
}

const BETA_CSS = `
.bt {
  min-height: 100vh; max-width: 480px; margin: 0 auto;
  padding: 0 18px calc(24px + env(safe-area-inset-bottom));
  background: var(--color-mgp-cream); color: var(--color-mgp-ink);
  font-family: var(--font-mgp-body); line-height: 1.5;
  display: flex; flex-direction: column;
}
.bt-top { display: flex; align-items: center; gap: 10px; padding: 18px 0 8px; }
.bt-monogram {
  width: 28px; height: 28px; border-radius: 50%;
  border: 1.5px solid var(--color-mgp-gold-dark);
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--color-mgp-gold-dark); font-family: var(--font-mgp-display); font-size: 15px;
}
.bt-brand { font-family: var(--font-mgp-display); font-size: 18px; font-weight: 500; flex: 1; }
.bt-badge {
  font-family: var(--font-mgp-stamp); font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--color-mgp-stamp-red); border: 1px solid var(--color-mgp-stamp-red);
  padding: 3px 8px; border-radius: 4px;
}
.bt-dots { display: flex; gap: 8px; justify-content: center; padding: 14px 0 18px; }
.bt-dots span { width: 8px; height: 8px; border-radius: 50%; background: var(--color-mgp-border); }
.bt-dots span.done { background: var(--color-mgp-gold); }
.bt-dots span.on { background: var(--color-mgp-cover); width: 22px; border-radius: 4px; }
.bt-card {
  flex: 1; background: var(--color-mgp-paper);
  border: 1.5px solid var(--color-mgp-border-strong); border-radius: 14px;
  padding: 26px 22px; box-shadow: 0 8px 24px rgba(31,58,46,0.10);
}
.bt-eyebrow {
  font-family: var(--font-mgp-stamp); font-size: 11px; letter-spacing: 3px;
  text-transform: uppercase; color: var(--color-mgp-stamp-red); margin-bottom: 12px;
}
.bt-h {
  font-family: var(--font-mgp-display); font-weight: 500; font-size: 32px;
  line-height: 1.08; letter-spacing: -0.5px; margin-bottom: 14px;
}
.bt-h em { font-style: italic; color: var(--color-mgp-stamp-red); font-weight: 400; }
.bt-p { font-size: 15px; color: var(--color-mgp-ink-2); margin-bottom: 14px; }
.bt-note { font-size: 13px; color: var(--color-mgp-ink-3); margin-top: 14px; }
.bt-list { list-style: none; padding: 0; margin: 6px 0 0; display: flex; flex-direction: column; gap: 12px; }
.bt-list li { font-size: 15px; color: var(--color-mgp-ink-2); padding-left: 24px; position: relative; }
.bt-list li::before { content: '✦'; position: absolute; left: 0; color: var(--color-mgp-gold-dark); }
.bt-seg {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin: 4px 0 18px;
  border: 1px solid var(--color-mgp-border-strong); border-radius: 6px; overflow: hidden;
}
.bt-seg button {
  padding: 12px 8px; background: transparent; border: none; cursor: pointer;
  font-family: var(--font-mgp-stamp); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--color-mgp-ink-2);
}
.bt-seg button.on { background: var(--color-mgp-cover); color: var(--color-mgp-cream); }
.bt-steps { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 18px; counter-reset: s; }
.bt-steps li { counter-increment: s; display: flex; flex-direction: column; gap: 10px; font-size: 15px; color: var(--color-mgp-ink-2); padding-left: 34px; position: relative; }
.bt-steps li::before {
  content: counter(s); position: absolute; left: 0; top: 0; width: 24px; height: 24px; border-radius: 50%;
  background: var(--color-mgp-cover); color: var(--color-mgp-cream);
  font-family: var(--font-mgp-stamp); font-size: 12px; display: flex; align-items: center; justify-content: center;
}
.bt-nav { display: flex; justify-content: space-between; gap: 12px; padding-top: 18px; }
.bt-btn {
  font-family: var(--font-mgp-stamp); font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
  font-weight: 700; padding: 14px 22px; border-radius: 4px; text-decoration: none;
  display: inline-flex; align-items: center; justify-content: center; border: none; cursor: pointer;
  min-height: 48px; text-align: center;
}
.bt-btn-gold {
  background: linear-gradient(180deg, var(--color-mgp-gold-light) 0%, var(--color-mgp-gold) 60%, var(--color-mgp-gold-dark) 100%);
  color: var(--color-mgp-cover-ink);
  box-shadow: 0 2px 6px rgba(154,126,42,0.35), inset 0 -1px 0 rgba(0,0,0,0.12);
}
.bt-btn-ghost { background: transparent; color: var(--color-mgp-cover); border: 1px solid var(--color-mgp-border-strong); }
.bt-nav .bt-btn-gold { margin-left: auto; }
`
