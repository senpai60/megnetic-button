/**
 * ==============================================================================
 * DAY 07: THE MAGNETIC BUTTON EFFECT (GSAP + JAVASCRIPT)
 * ==============================================================================
 * 
 * THE CORE CONCEPT:
 * When the user's cursor moves over a button, the button subtly translates
 * towards the cursor, creating an organic, high-end "magnetic pull" feel.
 * When the cursor leaves, the button bounces back to its original position
 * with a realistic spring snapback.
 * 
 * WHY NOT JUST USE MOUSE COORDINATES DIRECTLY?
 * 'e.clientX' and 'e.clientY' are calculated relative to the TOP-LEFT (0, 0)
 * of the entire browser window. The button doesn't care about the window's
 * origin—it only needs to know: "How far is the cursor from MY own center?"
 * 
 * THE 4-STEP FORMULA:
 * 1. Get Button Center:
 *    centerX = rect.left + (rect.width / 2)
 *    centerY = rect.top  + (rect.height / 2)
 * 
 * 2. Calculate Distance & Direction:
 *    distanceX = cursorX - centerX   (Positive = Right, Negative = Left)
 *    distanceY = cursorY - centerY   (Positive = Down,  Negative = Up)
 * 
 * 3. Apply Dampen Factor (35%):
 *    targetX = distanceX * 0.35
 *    targetY = distanceY * 0.35
 *    Why 35%? If you moved 100%, the button would stick to the cursor.
 *    35% movement gives that subtle, premium magnetic tension.
 * 
 * 4. Spring Snapback on Leave:
 *    Reset target to (0, 0) with GSAP 'elastic.out' easing.
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// DOM Elements Selection
// ------------------------------------------------------------------------------
const followBtn = document.getElementById('followBtn');
const btnText   = followBtn.querySelector('.btn-text');
const btnIcon   = followBtn.querySelector('.btn-icon');

// ------------------------------------------------------------------------------
// 1. MAGNETIC TRACKING (mousemove event)
// ------------------------------------------------------------------------------
followBtn.addEventListener('mousemove', (e) => {
  // Step 1: Get the current size and viewport-relative position of the button
  const rect = followBtn.getBoundingClientRect();

  // Step 2: Compute the EXACT center coordinates of the button
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top  + rect.height / 2;

  // Step 3: Calculate offset distance & direction from button center to mouse
  // distanceX > 0 means mouse is on the right side of center
  // distanceX < 0 means mouse is on the left side of center
  const distanceX = e.clientX - centerX;
  const distanceY = e.clientY - centerY;

  // Step 4: Animate button position using GSAP
  // Multiply by 0.35 so the button moves only 35% of the mouse distance
  gsap.to(followBtn, {
    x: distanceX * 0.35,
    y: distanceY * 0.35,
    duration: 0.3,
    ease: 'power2.out', // Smooth, responsive easing
    overwrite: 'auto',   // Automatically kill previous conflicting tweens
  });
});

// ------------------------------------------------------------------------------
// 2. SPRING SNAPBACK (mouseleave event)
// ------------------------------------------------------------------------------
followBtn.addEventListener('mouseleave', () => {
  // When cursor leaves the button area, spring back to (x: 0, y: 0)
  gsap.to(followBtn, {
    x: 0,
    y: 0,
    duration: 0.7,
    // elastic.out(amplitude, period):
    // 1   = Standard overshoot amplitude
    // 0.4 = Quick, snappy wobble settling time
    ease: 'elastic.out(1, 0.4)',
    overwrite: 'auto',
  });
});

// ------------------------------------------------------------------------------
// 3. BONUS MICRO-INTERACTION: Follow / Following Toggle Click
// ------------------------------------------------------------------------------
let isFollowing = false;

followBtn.addEventListener('click', () => {
  isFollowing = !isFollowing;

  // Toggle active CSS class for visual state
  followBtn.classList.toggle('active', isFollowing);

  if (isFollowing) {
    // State: Following
    btnText.textContent = 'Following';
    btnIcon.innerHTML = `
      <polyline points="20 6 9 17 4 12"></polyline>
    `;

    // Subtle scale "pop" punch animation when followed
    gsap.fromTo(
      followBtn, 
      { scale: 0.94 }, 
      { scale: 1, duration: 0.4, ease: 'back.out(2)' }
    );
  } else {
    // State: Follow (Default)
    btnText.textContent = 'Follow';
    btnIcon.innerHTML = `
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    `;
  }
});
