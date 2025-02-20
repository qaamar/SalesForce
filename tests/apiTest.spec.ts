import { test, expect } from "@playwright/test";

test.skip("API test with existing context", async ({ page }) => {
  const context = page.request; 
  //use like this when you have existing context in playwright config as baseUrl

  const response = await (await context.get("/api/users?page=2")).json();
  console.log(response);
  expect(response).toHaveProperty("page");
  expect(response).toHaveProperty("per_page");
 
  // Assert data type and value for each property
  expect(typeof response.page).toBe("number");
  expect(response.page).toEqual(2);

  expect(typeof response.per_page).toBe("number");
  expect(response.per_page).toEqual(6);

  expect(Array.isArray(response.data)).toBe(true);
  expect(response.data.length).toEqual(6);

  expect(typeof response.support).toBe("object");
  expect(typeof response.support.url).toBe("string");
  expect(typeof response.support.text).toBe("string");

  for (const item of response.data) {
    expect(typeof item.id).toBe("number");
    expect(typeof item.email).toBe("string");
    expect(typeof item.first_name).toBe("string");
    expect(typeof item.last_name).toBe("string");
    expect(typeof item.avatar).toBe("string");
  }
});

test("API test with new context", async({playwright})=> {

    const request = await playwright.request;

    const newContext = await request.newContext({
        baseURL: "https://reqres.in/",
        // extraHTTPHeaders: {
        //     "Accept": "application/json"
        // }
    });

    const response = await newContext.get("/api/users?page=1");
    const responseJson = await response.json();

    for(const item of responseJson.data)
        {
            expect(item).toHaveProperty("id");
            expect(item).toHaveProperty("email");
            expect(item).toHaveProperty("first_name");
            expect(item).toHaveProperty("last_name");
            expect(item).toHaveProperty("avatar");
            
        }
    
})

test("API test with url in the test", async ({ browser }) => {
    const context = await browser.newContext({ baseURL: "https://reqres.in/" });
    const page = await context.newPage();
    //use like this when you have existing context in playwright config as baseUrl
  
    const response = await (await page.request.get("/api/users?page=2")).json();
    console.log(response);
    expect(response).toHaveProperty("page");
    expect(response).toHaveProperty("per_page");
});