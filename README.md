<pre>
================================================================================
COMPREHENSIVE PLAYWRIGHT AUTOMATION FRAMEWORK (8-SERVICE CORE)
================================================================================

An enterprise-grade, end-to-end test automation framework built using Playwright 
and JavaScript/TypeScript. This repository contains 120 robust test cases 
structured across 8 modular business domains, following industry best practices 
like the Page Object Model (POM), Data-Driven Testing, and parallel cross-browser 
execution.

--------------------------------------------------------------------------------
KEY FRAMEWORK FEATURES
--------------------------------------------------------------------------------

* Robust Architecture
  Complete adherence to the Page Object Model (POM) pattern for strict separation 
  of locators and test logic.

* Cross-Browser Multi-Threading
  Configured to run seamlessly across Chromium, Firefox, and WebKit (Safari) 
  engines concurrently.

* Data-Driven Core
  Dynamic dataset isolation utilizing external JSON injections for multi-role 
  user profile validation.

* Resilient Execution
  Automated parameterized test-level retries and advanced wait strategies to 
  eliminate flakiness on dynamic elements.

* Enterprise Reporting
  Full integration with Allure Report and default Playwright HTML reporters 
  for rich graphical analytics.

* CI/CD Integrated
  Automated pipeline readiness using GitHub Actions workflow.

--------------------------------------------------------------------------------
REPOSITORY STRUCTURE
--------------------------------------------------------------------------------

The framework is highly organized into logical modules:

├── .github/workflows/
│   └── playwright.yml                      # Continuous Integration pipeline configuration
├── pages/                                  # Page Object Model (POM) Locator & Action classes
│   ├── 01_AuthenticationPage.js
│   ├── 02_DynamicInputsPage.js
│   ├── 03_ShadowDomPage.js
│   ├── 04_IframeStealthPage.js
│   ├── 05_DropdownMenuPage.js
│   ├── 06_ApiMockingPage.js
│   ├── 07_DataDrivenRetriesPage.js
│   └── 08_CustomFetchersPage.js
├── tests/                                  # Modular Test Suites (15 Test Cases per Service)
│   ├── 01_Authentication_Forms/
│   ├── 02_Dynamic_Form_Inputs/
│   ├── 03_Shadow_DOM_Targeting/
│   ├── 04_Iframe_Stealth_Interactions/
│   ├── 05_Dropdown_Menu_Matrices/
│   ├── 06_API_Testing_Mocking/
│   ├── 07_Data_Driven_Retries/             # Contains userData.json for isolated injections
│   └── 08_Custom_Fetchers_Accessibility/
├── playwright.config.js                    # Global multi-browser & parallel execution orchestration
├── package.json                            # Manifest file containing dependencies and scripts
├── package-lock.json                       # Locked dependency tree for consistent environments
└── README.md                               # Framework documentation

--------------------------------------------------------------------------------
PREREQUISITES AND INSTALLATION
--------------------------------------------------------------------------------

Ensure you have Node.js installed on your machine before setting up the project.

1. Clone the Repository
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME

2. Install Core Dependencies
   npm install

3. Install Playwright Browsers
   npx playwright install

--------------------------------------------------------------------------------
TEST EXECUTION MATRIX
--------------------------------------------------------------------------------

1. Run the Entire Suite (360 Test Combinations across 3 Browsers)
   npx playwright test

2. Fast Targeted Execution (Chromium Headless - Recommended)
   npx playwright test --project=chromium

3. Running a Specific Service (e.g., Service 6 on WebKit only)
   npx playwright test tests/06_API_Testing_Mocking/06_apiMocking.spec.js --project=webkit --headed

--------------------------------------------------------------------------------
TEST ANALYTICS AND REPORTS
--------------------------------------------------------------------------------

The framework records comprehensive execution logs and screenshots on failures.

* Interactive Allure Dashboards
  To generate and view the interactive analytics dashboard locally:

  1. Clean old cached traces and spin the dashboard:
     npx allure serve allure-results

  2. Generate a static build report:
     npx allure generate allure-results --clean && npx allure open

  The report breaks down execution history, test suite behaviors, flaky retry 
  paths, and visual failure attachments.

--------------------------------------------------------------------------------
SECURITY AND INDUSTRY STANDARDS
--------------------------------------------------------------------------------

* Zero Credential Leaking
  Built to absorb dynamic environment bindings. Fully compliant with enterprise 
  security mandates by removing hardcoded sensitive vectors.

* Optimal Resource Allocation
  Fine-tuned to use optimized hardware worker threads, balancing continuous 
  integration speed without throttling memory buffers or processor boundaries.

================================================================================
</pre>