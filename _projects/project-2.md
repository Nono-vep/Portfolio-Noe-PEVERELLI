---
layout: post
title: "Resonant DC/DC Converter Study"
folder: "project-2"
description: "Feasibility study, simulation, and prototyping of a Resonant DC/DC Converter for aeronautical applications."
skills: 
  - Power Electronics
  - LTSpice Simulation
  - MATLAB & Simulink
  - Python Scripting
  - Experimental Measurements
main-image: "IMG_9725.jpeg"
math: true
---

During my internship at **Parker Meggitt**, I worked on the feasibility study of a resonant DC/DC Converter for the aerospace industry.

The project was divided into three main phases:
1.  Theoretical study of the RLC circuit.
2.  Simulations (LTSpice & MATLAB).
3.  Experimental validation on a prototype.

### Theoretical Study: Series RLC Circuit

Before working on the full converter, I had to understand the resonance phenomenon. The system is based on a series RLC circuit acting as a band-pass filter. 

I analyzed the **current resonance** to understand how to generate a sinusoidal current from a square wave voltage input. I calculated key parameters such as:
* The resonance frequency ($f_r$).
* The quality factor ($Q$).
* The bandwidth.

I also used **Python** to plot the evolution of the Quality Factor $Q$ as a function of the resistance $R$, to optimize the efficiency.


### Simulation and Sensitivity Analysis

I performed extensive simulations using **LTSpice** and **MATLAB Simulink**. The goal was to verify the theoretical calculations and analyze the system's behavior under different conditions.

One of the most important parts of my work was the **sensitivity analysis**. I simulated the impact of component tolerances (Inductance $L$ and Capacitor $C$) on the system.
* I observed that a variation of $\pm 10\%$ on the components caused a significant phase shift at the switching frequency (100 kHz).
* This showed that component precision is a critical factor for the converter's efficiency.

<div class="carousel-container">

    <div class="carousel-slide fade">
        <img src="/Portfolio-Noe-PEVERELLI/assets/images/projects/project-2/IMG_5240.png" style="width:100%">
    </div>

    <div class="carousel-slide fade">
        <img src="/Portfolio-Noe-PEVERELLI/assets/images/projects/project-2/IMG_5241.png" style="width:100%">
    </div>

    <div class="carousel-slide fade">
        <img src="/Portfolio-Noe-PEVERELLI/assets/images/projects/project-2/IMG_5242.png" style="width:100%">
    </div>

    <div class="carousel-slide fade">
        <img src="/Portfolio-Noe-PEVERELLI/assets/images/projects/project-2/IMG_5243.png" style="width:100%">
    </div>

    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>

</div>

### Experimental Measurements

Finally, I validated my simulation models by taking measurements on an adapted physical prototype ("maquette"). 

I compared the theoretical amplitude and phase values with the real signals measured on the oscilloscope. This step allowed me to confirm that the converter successfully transforms the square input voltage into a quasi-sinusoidal current, which is essential for minimizing switching losses.

{% include image-gallery.html images='IMG_9538.jpeg' height="600" %}


### What I Learned

This internship was a great opportunity to deepen my knowledge in power electronics.
* **Simulation Tools:** I improved my skills on LTSpice and learned how to use Python for automating engineering calculations.
* **Resonance constraints:** I understood the complexity of tuning a resonant circuit and the impact of parasitic elements.
* **Rigorous approach:** I learned to cross-check results between theoretical math, digital simulation, and physical reality.

