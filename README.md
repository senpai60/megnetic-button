# 🧲 Day 07: Magnetic Button & Apple-Style Social Card

Welcome! This is the complete source code for **Day 07** of the **30-Day Creative Frontend Reel Series**.

---

## ⚡ Quick Start (No Setup Required!)

1. **Unzip the folder**.
2. **Double-click `index.html`** in your browser (Chrome, Safari, Edge, or Brave).
3. Move your cursor over the **Follow** button to experience the smooth magnetic pull and spring snapback!

> **Optional**: If you use VS Code, you can also right-click `index.html` and select **"Open with Live Server"**.

---

## 🧠 The Core Logic: How Does It Actually Work?

Many developers get confused about why we can't just use `e.clientX` directly:

### 1. Viewport Coordinates vs. Button Center
* `e.clientX` and `e.clientY` measure distance from the **top-left corner `(0, 0)` of the entire screen**.
* The button does not care about the screen’s origin—it only needs to know:  
  **"How far is the cursor from MY OWN center?"**

```
 Screen Origin (0, 0)
 +-------------------------------------------+
 |                                           |
 |            Button Center (centerX, centerY)|
 |                  +--------+               |
 |                  |   🧲   |  <-- ΔX, ΔY   |
 |                  +--------+       (Cursor)|
 |                                           |
 +-------------------------------------------+
```

### 2. The 4-Step JavaScript Math
Inside [`script.js`](./script.js):

1. **Find Button Center**:
   ```javascript
   const rect = button.getBoundingClientRect();
   const centerX = rect.left + rect.width / 2;
   const centerY = rect.top  + rect.height / 2;
   ```
2. **Calculate Distance & Direction**:
   ```javascript
   const distanceX = e.clientX - centerX;
   const distanceY = e.clientY - centerY;
   ```
   * *If mouse is to the right*: `distanceX` is **positive (+)**.
   * *If mouse is to the left*: `distanceX` is **negative (-)**.
3. **Apply the 35% Dampen Factor**:
   ```javascript
   gsap.to(button, {
     x: distanceX * 0.35,
     y: distanceY * 0.35,
     duration: 0.3,
     ease: 'power2.out',
   });
   ```
   > 💡 **Why 0.35?** If you moved the button 100% of the distance, the button would glue to the cursor like a sticker. Moving only 35% creates that subtle, high-end "magnetic tension".
4. **Spring Snapback on Leave**:
   ```javascript
   button.addEventListener('mouseleave', () => {
     gsap.to(button, {
       x: 0,
       y: 0,
       duration: 0.7,
       ease: 'elastic.out(1, 0.4)', // Spring bounce
     });
   });
   ```

---

## 🚀 The GPU Secret (`will-change: transform`)

In [`style.css`](./style.css):

```css
.follow-btn {
  will-change: transform;
}
```

Because mouse movement fires up to 120 times per second, `will-change: transform` tells the browser to promote the button to its own **GPU compositor layer**. This keeps frame rates locked at **60-120 FPS** with zero layout reflows or CPU lag!

---

## 🎨 How to Customize

| Feature | Where to change | What to edit |
| :--- | :--- | :--- |
| **Pull Strength** | `script.js` | Increase `0.35` (e.g., `0.5` for stronger pull, `0.2` for subtler) |
| **Spring Wobble** | `script.js` | Adjust `elastic.out(1, 0.4)` — increase `0.4` for slower bounciness |
| **Card Image** | `index.html` | Change `<img src="download (2).png">` to your own image |
| **Emoji Tags** | `index.html` | Swap any Apple Emoji URL from the [jsdelivr emoji CDN](https://cdn.jsdelivr.net/npm/emoji-datasource-apple/) |

---

## 📁 Project Structure

```
reel-show/
├── index.html                           # Clean markup & semantic structure
├── style.css                            # Apple aesthetics, glassmorphism, GPU rules
├── script.js                            # Magnetic tracking & spring snapback math
├── download (2).png                     # Card portrait asset
├── Motion-Blurred Woman in Shadows.png  # Dreamy blurred background asset
└── README.md                            # Complete guide & documentation
```

---

⭐ **Thank you for learning with us! Keep building awesome web experiences!**
