---
layout: post
title: "Audio Amplifier PCB Design"
folder: "project-4"
description: "Design, simulation, and routing of an audio processing card featuring a low-pass filter and a Wah-wah effect for an analog amplifier."
skills: 
  - PCB Design (Eagle)
  - Analog Electronics
  - LTSpice Simulation
  - Functional Testing
  - Soldering (CMS & Through-hole)
math: true
main-image: "Ampli_Carte_Noe.jpg" # Replace with your actual photo
---

During my first year of BUT, I worked on the design of an audio processing card for an analog amplifier. The goal was to create specific audio effects to insert between the pre-amplifier and the power amplifier.

I chose to implement two effects: a **Low-pass filter** on the left channel and a **Wah-wah effect** on the right channel.

### Functional Analysis and Simulation

Before designing the PCB, I simulated the circuits on **LTSpice** to validate the theoretical values of the components.

**1. Low-Pass Filter (Left Channel):**
I designed a 4th-order low-pass filter by cascading two 2nd-order active filters using **LT1055** op-amps.
* The cutoff frequency was set around **960 Hz**.
* I added an inverting amplifier stage with a potentiometer to adjust the output gain.

**2. Wah-wah Effect (Right Channel):**
For the Wah-wah effect, I used a band-pass filter structure where the resonance frequency is controlled by a potentiometer.
* By varying the resistance, I could shift the resonance peak, creating the characteristic "Wah-wah" sound.
* I verified the frequency response using Bode plots in LTSpice.


### PCB Design and Routing

After validating the schematics, I moved to the routing phase using **Eagle** software.
* I used a **TL084** quad op-amp to save space and simplify the routing.
* I placed decoupling capacitors ($100 nF$) close to the integrated circuits to minimize noise.
* I chose a slide potentiometer for the Wah-wah effect to make it easier to use during demonstration.

{% include image-gallery.html images='Ampli_Typon.png' height="600" %}

### Assembly and Testing

Once the PCB was manufactured, I soldered the components (including Surface Mount Devices - CMS) and followed a strict testing procedure.

**Structural Tests:**
* Visual inspection of tracks and soldering.
* Continuity checks with a multimeter to ensure no short circuits between VCC and Ground.

**Functional Tests:**
* I injected a sinusoidal signal ($1V$, $300Hz$) and observed the output on an oscilloscope.
* **Issue encountered:** I realized during testing that I had inverted the inputs of two op-amps on my schematic. I had to fix this by modifying the connections on the board directly.
* **Result:** After correction, the Wah-wah effect worked as expected, shifting the gain peak when moving the potentiometer.

**What I Learned:**
* **Simulation vs Reality:** I learned that simulations are perfect, but real-world wiring requires careful attention (e.g., verifying op-amp pinouts!).
* **PCB Rigor:** The importance of component placement to facilitate routing and debugging.
* **Debugging:** How to troubleshoot a board step-by-step when the output doesn't match the simulation.

{% include image-gallery.html images='Ampli_Oscillo.png, Ampli_Final.jpg' height="600" %}
