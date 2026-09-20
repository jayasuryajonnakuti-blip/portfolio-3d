from PIL import Image

try:
    img1 = Image.open('public/assets/hero-slide-1.jpg')
    w1, h1 = img1.size
    print('Slide 1 dimensions:', w1, h1)
    
    # Center artwork for Slide 1 (cyborg + red planet)
    # The center artwork in slide 1 spans roughly from x: 0.30*w to 0.75*w, y: 0.05*h to 0.58*h
    crop1 = img1.crop((int(w1 * 0.32), int(h1 * 0.08), int(w1 * 0.74), int(h1 * 0.56)))
    crop1.save('public/assets/hero-center-cyborg.jpg', quality=95)
    print('Saved hero-center-cyborg.jpg')

    img2 = Image.open('public/assets/hero-slide-2.jpg')
    w2, h2 = img2.size
    print('Slide 2 dimensions:', w2, h2)
    
    # Center artwork for Slide 2 (astronaut + fissure planet)
    crop2 = img2.crop((int(w2 * 0.30), int(h2 * 0.08), int(w2 * 0.75), int(h2 * 0.56)))
    crop2.save('public/assets/hero-center-cosmic.jpg', quality=95)
    print('Saved hero-center-cosmic.jpg')

    # Central orbital sphere for Skills from skills-universe-bg.jpg
    img3 = Image.open('public/assets/skills-universe-bg.jpg')
    w3, h3 = img3.size
    print('Skills dimensions:', w3, h3)
    crop3 = img3.crop((int(w3 * 0.30), int(h3 * 0.08), int(w3 * 0.70), int(h3 * 0.58)))
    crop3.save('public/assets/skills-center-orbit.jpg', quality=95)
    print('Saved skills-center-orbit.jpg')

except Exception as e:
    print('Error:', e)
