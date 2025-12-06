---
layout: post
title: "Solar MPPT Boost Converter"
folder: "project-3"
description: "Design, sizing, and manufacturing of an analog MPPT Boost converter to charge supercapacitors for a solar-powered vehicle."
skills: 
  - Power Electronics (Boost Topology)
  - Analog Control (SG3524)
  - PCB Design (Eagle)
  - Component Sizing & Thermal Analysis
  - Testing & Debugging
math: true
main-image: "IMG_5541.png"
---

In the context of the **Angers Solar Challenge**, our group (Group 221) had to design and manufacture a power conversion card. The objective was to interface a solar panel with a bank of supercapacitors to power a small electric vehicle.

We designed a **Boost Converter** (Step-up chopper) with an analog Maximum Power Point Tracking (MPPT) regulation.

### System Architecture and Design

The system is built around the **SG3524** PWM controller. The goal is to maintain the solar panel voltage around its Maximum Power Point ($V_{mp} \approx 18V$) by adjusting the duty cycle of the converter.

The power stage consists of:
* **Inductor:** $220 \mu H$ to limit current ripple.
* **Switch:** IRF540 MOSFET (Low $R_{DS(on)}$ to minimize conduction losses).
* **Diode:** MBR745 Schottky Diode (Low forward voltage drop $V_F$ for efficiency).

{% include image-gallery.html images='IMG_5542.jpeg' height="600" %}

### Sizing and Calculations

We performed detailed calculations to ensure the reliability of the converter.

**1. Current Ripple & Inductance:**
We calculated the current ripple $\Delta I$ in the inductor for different operating points. For a switching frequency of $F_c = 30 \text{ kHz}$:
$$\Delta I = \frac{V_e \cdot \alpha}{L \cdot F_c}$$
For $V_e = 18V$ and $\alpha = 0.15$, we found a ripple of approx **0.409 A**.

**2. Thermal Analysis:**
We verified if heatsinks were necessary for the power components.
* **Diode Power Dissipation:** $P_{diode} \approx 0.033 \text{ W}$.
* **MOSFET Power Dissipation:** $P_{total} \approx 0.005 \text{ W}$ (including switching and conduction losses).
* **Conclusion:** The junction temperatures $\theta_j$ remained well below $125^\circ C$ ($40.1^\circ C$ and $40.3^\circ C$ respectively), so **no heatsinks were needed**.

### Control and Safety Logic

To protect the supercapacitors, we implemented a **Charge Stop (Shutdown)** mechanism using an **LM393** comparator with hysteresis (Schmitt Trigger).
* **High Threshold:** 27V (Max voltage of supercaps).
* **Low Threshold:** 23V (Hysteresis to avoid oscillations).

When the output voltage reaches 27V, the comparator triggers the shutdown pin of the SG3524, effectively cutting off the PWM signal.

{% include image-gallery.html images='IMG_8168.jpeg' height="600" %}

### PCB Realization and Testing

After designing the schematic and routing the PCB (Typon), we manufactured the board and followed a strict testing procedure:
1.  **Structural Tests:** Visual inspection and continuity checks (ohmmeter) to detect short circuits before powering up.
2.  **Functional Tests:** We validated the PWM generation and the regulation loop using a laboratory power supply and an oscilloscope.
3.  **Full Load Test:** Finally, we tested the board with the actual solar panel and supercapacitors. We measured a switching frequency of **29.33 kHz**, very close to our theoretical target of 30 kHz.

**What I Learned:**
* **Analog Regulation:** I learned how to stabilize a voltage loop using purely analog components (Op-amps, PWM controllers).
* **PCB Constraints:** Routing power tracks requires careful consideration of current density and parasitic inductance.
* **Debugging:** The step-by-step testing procedure was crucial to identify issues before connecting expensive components like supercapacitors.

<div class="carousel-container">

    <div class="carousel-slide fade">
        <img src="assets/images/projects/project-3/IMG_8106.jpeg" style="width:100%">
    </div>

    <div class="carousel-slide fade">
        <img src="assets/images/projects/project-3/IMG_8109.jpeg" style="width:100%">
    </div>

    <div class="carousel-slide fade">
        <img src="assets/images/projects/project-3/IMG_8131.jpeg" style="width:100%">
    </div>

    <div class="carousel-slide fade">
        <img src="assets/images/projects/project-3/IMG_8145.jpeg" style="width:100%">
    </div>

    <div class="carousel-slide fade">
        <img src="assets/images/projects/project-3/IMG_8602.jpeg" style="width:100%">
    </div>

    <div class="carousel-slide fade">
        <img src="assets/images/projects/project-3/IMG_8603.jpeg" style="width:100%">
    </div>

    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>

</div>


| Component | Value | Ref |
|-----------|-------|-----|
| Inductor  | 220 µH| L1  |
| MOSFET    | IRF540| Q1  |
| Controller| SG3524| U1  |

