# Changelog

## 1.0.0 (2026-08-06)


### Features

* add booking mutations with optimistic UI and localStorage persistence ([227e0a0](https://github.com/forbiddenlink/apoc-bnb/commit/227e0a00a01b679a7f0d2477af341d4d3c445448))
* add bookings link to mobile menu ([b4b39fa](https://github.com/forbiddenlink/apoc-bnb/commit/b4b39faf68e525bff264abfc7f5c8e860b96ab2c))
* add bookings page to view persisted booking history ([58b1d1b](https://github.com/forbiddenlink/apoc-bnb/commit/58b1d1b980536a38dd1031a4cc0a90cefe7e7171))
* add cookie consent, emergency broadcasts, incident reports, ([618f5e3](https://github.com/forbiddenlink/apoc-bnb/commit/618f5e3ff9863579c5860174f3d28eca4fb946f3))
* add exponential backoff retry with smart error handling ([2dc638d](https://github.com/forbiddenlink/apoc-bnb/commit/2dc638da89684312d26adc276e88a1c22b615730))
* add FAQ, Terms, 404 pages and expand all content ([b99cebb](https://github.com/forbiddenlink/apoc-bnb/commit/b99cebb002fab38c820e9b902c0593dd0e5b3dc7))
* add prefetching for bunker details on hover ([a3d579d](https://github.com/forbiddenlink/apoc-bnb/commit/a3d579d2b8759105453c59ed8a436a1b0c2bcd0a))
* add React Query for data fetching with caching ([9318752](https://github.com/forbiddenlink/apoc-bnb/commit/9318752cfb9afbfd5389018f4501252dcf9e26e6))
* add synthesized sound effects for UI interactions ([32346c0](https://github.com/forbiddenlink/apoc-bnb/commit/32346c00dfb24048b45f675170d5cac989d583fa))
* add useReviews hook and update BunkerDetailResponse type ([59dc08b](https://github.com/forbiddenlink/apoc-bnb/commit/59dc08b650bcf05d4152446ad29eda165b1d5081))
* Awwwards design elevation - Phases 1-3 ([c1cdce6](https://github.com/forbiddenlink/apoc-bnb/commit/c1cdce64ba477457fa11541679d474e1acbac5da))
* Awwwards design elevation - Phases 4-6 ([d5f0f19](https://github.com/forbiddenlink/apoc-bnb/commit/d5f0f199408649c3575bfa93889fa76f08fa7d75))
* complete visual polish with generated assets ([48d4db5](https://github.com/forbiddenlink/apoc-bnb/commit/48d4db5e2e262ce8c72d897db757e21946c67c12))
* comprehensive design audit with mobile responsiveness ([883bb42](https://github.com/forbiddenlink/apoc-bnb/commit/883bb42857efcfc4b06523c2ae3650c4c6980aa9))
* **design:** Implement High-End Survivalist design overhaul ([092502e](https://github.com/forbiddenlink/apoc-bnb/commit/092502e60c3d4e7fe5e15b1cd7846888ab3585f1))
* generate 10 missing reviewer avatars, resolve tactical-tim conflict, and update bunker images ([f72170e](https://github.com/forbiddenlink/apoc-bnb/commit/f72170e26a5f8503e3106fc5c5d9b6e4c7fe0d90))
* **home:** clarify APOC-BNB pitch and fix carousel overlap ([#51](https://github.com/forbiddenlink/apoc-bnb/issues/51)) ([1695e40](https://github.com/forbiddenlink/apoc-bnb/commit/1695e40bf6c7de8d2eeede856d4302229c3e9efa))
* Phase 3 - Polish & Easter Eggs complete ([d49bff3](https://github.com/forbiddenlink/apoc-bnb/commit/d49bff3aeb1c464598d434306b71affed6d83a7d))
* replace duplicate images with 19 new generated assets ([0a37c92](https://github.com/forbiddenlink/apoc-bnb/commit/0a37c92db6636aa4ce032b6354af5571ce343a43))
* survival-listing visual system ([c2bf936](https://github.com/forbiddenlink/apoc-bnb/commit/c2bf93627befb604a4f59c1a3743bb354dbe85e3))


### Bug Fixes

* add missing [@dinero](https://github.com/dinero).js/currencies package ([abb7846](https://github.com/forbiddenlink/apoc-bnb/commit/abb784663ef1919f476fd769583ca73193ef0bc8))
* align react version with react-dom (19.2.4) ([3c381b2](https://github.com/forbiddenlink/apoc-bnb/commit/3c381b2ace638f55f48977a3fd83d1dd2bda7756))
* **ci:** add --legacy-peer-deps flag to handle vite peer dependency conflicts ([44a3c3f](https://github.com/forbiddenlink/apoc-bnb/commit/44a3c3fa7f88e568f56b236fbf6170adf07f71a9))
* correct template artifacts in auth and middleware imports ([0983d54](https://github.com/forbiddenlink/apoc-bnb/commit/0983d5413940d951ed3b92d5687920cfc5af3262))
* **deps:** add pnpm-workspace overrides for security patches ([488cecc](https://github.com/forbiddenlink/apoc-bnb/commit/488cecc6b3c416737227f5ec6d8804e502d8eb4c))
* env.ts import, sentry paths, MSW types, safe-action api ([2a4ebbd](https://github.com/forbiddenlink/apoc-bnb/commit/2a4ebbd3ddc030ffbbca691018688ebc61e46311))
* patch 2 security vulnerabilities ([e61ab5d](https://github.com/forbiddenlink/apoc-bnb/commit/e61ab5d810a7d4add18554bbef337b4c5019cbcf))
* regenerate lockfile with legacy-peer-deps ([454925d](https://github.com/forbiddenlink/apoc-bnb/commit/454925d9836a8fd96d87d2037edaeb676a3ec82f))
* regenerate npm lockfile ([bd9342d](https://github.com/forbiddenlink/apoc-bnb/commit/bd9342d360a9a9764bb278cdf5f895b39c3a4ae2))
* regenerate package-lock.json for npm ci ([6b237c7](https://github.com/forbiddenlink/apoc-bnb/commit/6b237c7d4918b89ed82d16cf1096282ac9531052))
* remove conflicting npm overrides (pnpm overrides sufficient) ([4cc9e04](https://github.com/forbiddenlink/apoc-bnb/commit/4cc9e049f48ba85607f284f1b6a2e0b2ed0ead7b))
* remove invalid title prop from Skull icon ([f5ac275](https://github.com/forbiddenlink/apoc-bnb/commit/f5ac275ad26698878a71f09f7399f098ae392900))
* remove stale package-lock.json ([889fa72](https://github.com/forbiddenlink/apoc-bnb/commit/889fa724bcc78f8947adad7aac2ac8fc9c2e260a))
* resolve memory leaks, race conditions, accessibility and SEO issues ([71b8c62](https://github.com/forbiddenlink/apoc-bnb/commit/71b8c6213babdb99ad210cc4d5290c4a0eef77a4))
* sec sweep v3 tier 2 - bump next floor + add protobufjs/uuid ([#15](https://github.com/forbiddenlink/apoc-bnb/issues/15)) ([68eb630](https://github.com/forbiddenlink/apoc-bnb/commit/68eb6306af184fdb0166c09778cda5118bfd466c))
* skip env validation in CI build ([0aaefb1](https://github.com/forbiddenlink/apoc-bnb/commit/0aaefb1b4a72930b79a7494cf72da0e3ac80f9cc))
* sync npm overrides and regenerate lockfile for CI ([bcbe809](https://github.com/forbiddenlink/apoc-bnb/commit/bcbe80920903f8910762b8216a0dd54ed607dae7))
* use correct alpha version of [@dinero](https://github.com/dinero).js/currencies ([52d4798](https://github.com/forbiddenlink/apoc-bnb/commit/52d4798ec9ac3d0575edc5d0ef1856e9a1a2d475))
* Vercel build fixes ([110541d](https://github.com/forbiddenlink/apoc-bnb/commit/110541d775a9ddfaa85b199f7fe31e706e364840))


### Performance Improvements

* convert images to next/image for optimization ([c19462b](https://github.com/forbiddenlink/apoc-bnb/commit/c19462bf2d747a82ad49eb0399c5a530f581b09b))
