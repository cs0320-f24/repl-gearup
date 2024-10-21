import { test, expect } from '@playwright/test';


/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
})

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */
test('on page load, i see an input bar', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Command input')).toBeVisible()
})

test('after I type into the input box, its text changes', async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto('http://localhost:8000/');

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('Awesome command');

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`
  await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
});

test('on page load, i see a button', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await expect(page.getByRole('button')).toBeVisible()
});

test('after I click the button, its label increments', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await expect(page.getByRole('button', { name: 'Submitted 0 times' })).toBeVisible()
  await page.getByRole('button', { name: 'Submitted 0 times' }).click();
  await page.getByRole('button', { name: 'Submitted 1 times' }).click();
  await page.getByRole('button', { name: 'Submitted 2 times' }).click();
  await page.getByRole('button', { name: 'Submitted 3 times' }).click();
  await expect(page.getByRole('button', { name: 'Submitted 4 times' })).toBeVisible()

});

// TODO: Fill this in to test your button push functionality!
test('fetch works on different inputs', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('test');
  await page.getByRole('button', { name: 'Submitted 0 times' }).click();
  await expect(page.getByText('Error: Invalid input test')).toBeVisible();

  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('4');
  await page.getByRole('button', { name: 'Submitted 1 times' }).click();
  await expect(page.getByText('Error: Invalid input 4')).toBeVisible();

  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('3');
  await page.getByRole('button', { name: 'Submitted 2 times' }).click();
  await expect(page.getByText('Jlejandro Aackson')).toBeVisible();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('0');
  await page.getByRole('button', { name: 'Submitted 3 times' }).click();
  await expect(page.getByText('Nim Telson')).toBeVisible();
});
