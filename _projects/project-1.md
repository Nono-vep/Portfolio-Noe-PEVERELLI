---
layout: post
title: "Induction Motor Kart"
folder: "project-1"
description: "Retrofitting a thermal kart with an electric propulsion system: mechanical integration, power and control wiring, and drive parameterization."
skills: 
  - Variable Speed Drive (Curtis 1236E)
  - Electrical Wiring (Power & Command)
  - Mechanical Integration
  - Electrical Schematics
  - System Dimensioning
main-image: "IMG_8821.jpeg"
---

During this SAE project, we worked on commissioning the electric propulsion system of a kart, focusing on three main areas:
1.  **Command and Power Systems** (Drive and Batteries).
2.  **Mechanical Integration** (Braking and Transmission).
3.  **Parameterization and Testing**.

### Braking System Integration

Initially, the chassis did not have a functional braking system. We had to fully integrate the hydraulic circuit:
* Installed the caliper and brake pads on the existing rear shaft disc.
* Mounted the master cylinder to the chassis using a custom-machined plate.
* Connected the brake pedal to the master cylinder using a threaded rod linkage.

{% include image-gallery.html images='IMG_8838.jpeg' height="600" %}

### Motor Drive Wiring and Study

We used a **Curtis 1236E** variable speed drive powered by 48V (four 12V 52Ah batteries in series) to control the 4 kW Leroy Somer asynchronous motor. This drive allows for 4-quadrant operation, enabling energy recovery during braking.

Based on the documentation, we designed and implemented the wiring schematic:
* **Power Circuit:** Wired the batteries in series with a 200A fuse and an emergency stop switch, then connected them to the drive terminals (U, V, W, B+, B-). We had to crimp and extend certain power cables that were too short.
* **Control Circuit:** Wired the 35-pin connector, including the forward/reverse selector, the accelerator pedal (5kΩ potentiometer), and the motor sensors.

{% include image-gallery.html images='IMG_8859.jpeg' height="600" %}

### Parameterization and Electrical Schematic

The drive was configured using the **Curtis 1313** console with the following parameters for Speed Mode:
* *Speed Mode - Max Speed*: 3600 rpm (synchronous speed).
* *Throttle Type*: Type 1 (Potentiometer).
* *Nominal Voltage*: 48 V.

{% include image-gallery.html images='IMG_5141.png, IMG_5142.png' height="600" %}

### Testing and Conclusion

We performed theoretical calculations showing that a motor torque of 5.06 N.m is required to start, and the estimated autonomy is approximately 31 minutes at nominal speed.

During practical testing, we encountered a major issue with the **transmission**:
* The belt consistently loosened when driving.
* Despite adjusting the tensioner roller and the motor position, the motor pinion eventually broke due to improper installation.

As a result, the kart could not be driven on the track, but we validated the electrical operation and motor rotation on the test bench (measured speed of 400 rpm for a 15Hz setpoint).

**What I learned:**
* The importance of precision in control wiring (terminal blocks, crimping).
* The complexity of mechanical integration (transmission alignment) on an existing system.
* How to use industrial parameterization tools (Curtis Console).

<div class="carousel-container">
  <div class="carousel-slide fade">
      <img src="/Portfolio-Noe-PEVERELLI/assets/images/projects/project-1/IMG_8853.jpeg" style="width:100%">
  </div>
  
  <div class="carousel-slide fade">
      <img src="/Portfolio-Noe-PEVERELLI/assets/images/projects/project-1/IMG_8860.jpeg" style="width:100%">
  </div>
  
  <div class="carousel-slide fade">
      <img src="/Portfolio-Noe-PEVERELLI/assets/images/projects/project-1/IMG_8899.jpeg" style="width:100%">
  </div>
  
  <div class="carousel-slide fade">
      <img src="/Portfolio-Noe-PEVERELLI/assets/images/projects/project-1/IMG_5140.jpeg" style="width:100%">
  </div>
  
  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>


| Component | Specification |
|-----------|---------------|
| Motor     | Asynchronous 4kW |
| Battery   | 48V (4x12V)   |
| Drive     | Curtis 1236E  |
