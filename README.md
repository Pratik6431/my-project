# 🏦 End-to-End Automated Regression Suite (Capstone Project)

> **A production-ready, highly resilient Playwright Automation Framework built using JavaScript and the Page Object Model (POM) pattern to isolate front-end UI workflows from backend architectures.**

---

## Project Overview
This capstone project implements a robust, zero-flakiness automation suite targeting complex web components such as Dynamic Tables, nested Iframes, and Shadow DOM elements. The framework is structured into **8 core micro-services**, containing a total of **120 modular test cases** designed for parallel multi-browser execution and pipeline readiness.

### Target Application
* **Application URL:** [SelectorsHub Practice Page](https://selectorshub.com/xpath-practice-page/)
* **Architecture Choice:** 100% independent single-page ecosystem with high infrastructure uptime to guarantee flake-free pipeline runs.

---

## Framework Architecture Diagram
Below is the strict Page Object Model (POM) data-driven architectural flow utilized in this suite:

```text
┌──────────────────────────────────────────────────────────────────┐
│                      config/test-data.json                       │
│           (Externalized JSON Datasets - Data Driven)             │
└────────────────────────────────┬─────────────────────────────────┘
                                 │ (Injects Data)
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                          tests/*.spec.js                         │
│       (Parameterized Executions & Network Interceptions)         │
└────────────────────────────────┬─────────────────────────────────┘
                                 │ (Calls Actions / Assertions)
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                          pages/*.page.js                         │
│            (Isolated Selectors & Web Action Methods)             │
└──────────────────────────────────────────────────────────────────┘

