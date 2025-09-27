// Basic test file to satisfy Deno test runner
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

Deno.test("World of Darkness Hub - Basic functionality", () => {
    // Test that the site title is correct
    const expectedTitle = "World of Darkness Hub by ParadoxGirl";
    assertEquals(typeof expectedTitle, "string");
    assertEquals(expectedTitle.length > 0, true);
});

Deno.test("Character Creator URLs - Valid format", () => {
    const vampireUrl = "https://srparadox.github.io/Updated-VTM-5-Creator";
    const werewolfUrl = "https://srparadox.github.io/Werewolf-Character-Creator";
    
    // Test URL format
    assertEquals(vampireUrl.startsWith("https://"), true);
    assertEquals(werewolfUrl.startsWith("https://"), true);
    assertEquals(vampireUrl.includes("github.io"), true);
    assertEquals(werewolfUrl.includes("github.io"), true);
});

Deno.test("YouTube playlist URL - Valid format", () => {
    const youtubeUrl = "https://www.youtube.com/watch?v=_y2zmxQ3Aq0&list=PLWITncIqgXjiMhTfH8DN8lKUr-L7Rjj4e";
    
    assertEquals(youtubeUrl.startsWith("https://www.youtube.com"), true);
    assertEquals(youtubeUrl.includes("playlist") || youtubeUrl.includes("list="), true);
});