# Dependency Audit Report

**Date:** January 4, 2026
**Project:** napoleon-hill-ai

## Executive Summary

This audit analyzed the project's dependencies for outdated packages, security vulnerabilities, and unnecessary bloat. The overall dependency footprint is **minimal and well-maintained**, with only a few recommended updates.

---

## 1. Outdated Packages

### Dependencies
| Package | Current | Latest | Type | Priority |
|---------|---------|--------|------|----------|
| `react` | 19.0.0 | 19.2.3 | Production | **High** |
| `react-dom` | 19.0.0 | 19.2.3 | Production | **High** |
| `cordova-plugin-purchase` | 13.11.0 | 13.12.1 | Production | Medium |

### Recommendation
Update React and React-DOM to the latest patch version (19.2.3) to benefit from bug fixes and improvements. This is a patch update and should be safe.

```bash
npm install react@19.2.3 react-dom@19.2.3 cordova-plugin-purchase@13.12.1
```

---

## 2. Security Vulnerabilities

### 🔴 Moderate Severity Issues Found

#### esbuild (≤0.24.2)
- **Severity:** Moderate
- **CVE:** GHSA-67mh-4wv8-2f99
- **Description:** esbuild enables any website to send requests to the development server and read the response
- **Affected:** `vite` (depends on vulnerable esbuild)
- **Impact:** Development environment only (not production builds)

### Recommendation
The security issue affects the **development server only**, not production builds. Options:

1. **Immediate action (Recommended):** Update to Vite 6.x for security fix
   ```bash
   npm install vite@^6.1.6
   ```
   **Note:** This is a major version upgrade and may require code changes. Test thoroughly.

2. **Future action:** Upgrade to Vite 7.3.0 when ready for breaking changes
   ```bash
   npm audit fix --force
   ```
   **Warning:** This will install `vite@7.3.0` which includes breaking changes.

3. **Acceptable risk:** If you only use the dev server locally and don't expose it to untrusted networks, you can defer this update until you're ready for a major Vite upgrade.

---

## 3. Dependency Bloat Analysis

### Overall Assessment: ✅ **Excellent**

The project has a **minimal dependency footprint** with only essential packages:

#### Production Dependencies (4 packages)
```json
{
  "@google/genai": "^1.34.0",           // ⚠️ See note below
  "react": "^19.0.0",                    // ✅ Essential
  "react-dom": "^19.0.0",                // ✅ Essential
  "cordova-plugin-purchase": "^13.11.0"  // ✅ Essential for billing
}
```

#### Development Dependencies (7 packages)
```json
{
  "@capacitor/android": "^6.2.0",        // ✅ Mobile platform
  "@capacitor/assets": "^3.0.5",         // ✅ Asset generation
  "@capacitor/cli": "^6.2.0",            // ✅ Build tool
  "@capacitor/core": "^6.2.0",           // ✅ Core framework
  "@types/react": "^19.0.0",             // ✅ TypeScript types
  "@types/react-dom": "^19.0.0",         // ✅ TypeScript types
  "@vitejs/plugin-react": "^4.3.1",     // ✅ Build tool
  "typescript": "^5.5.3",                // ✅ Language
  "vite": "^5.4.1"                       // ✅ Build tool
}
```

### ⚠️ Potential Issue: `@google/genai`

**Finding:** The `@google/genai` package is declared in dependencies but appears to be **unused** in the codebase.

**Evidence:**
- No imports of `@google/genai` found in source files
- `services/geminiService.ts` is empty (0 bytes)
- ChatWindow component calls `generateNapoleonResponse` but the implementation is missing

**Impact:**
- Bundle size: Adds unnecessary weight to production builds
- Cost: Unused dependency that needs maintenance

**Recommendation:**
1. **If you plan to use it:** Implement the missing `geminiService.ts` functionality
2. **If not needed:** Remove it to reduce bundle size
   ```bash
   npm uninstall @google/genai
   ```

---

## 4. Bundle Size Optimization

### Current Status
- No CSS framework bloat detected (using Tailwind via classes)
- No unnecessary utility libraries
- All dependencies serve clear purposes

### Recommendations
1. ✅ Continue using inline Tailwind classes (no framework bloat)
2. ✅ Keep dependency count minimal
3. Consider code-splitting if app grows larger
4. Monitor bundle size as features are added

---

## 5. Action Plan

### Priority 1: Immediate (This Week)
```bash
# Update React packages (safe patch updates)
npm install react@19.2.3 react-dom@19.2.3

# Update Cordova plugin
npm install cordova-plugin-purchase@13.12.1

# Commit changes
git add package.json package-lock.json
git commit -m "Update dependencies: React 19.2.3, cordova-plugin-purchase 13.12.1"
```

### Priority 2: High (Next Sprint)
```bash
# Update Vite to fix security issue (test thoroughly)
npm install vite@^6.1.6
npm run build  # Test build
npm run dev    # Test dev server

# If successful, commit
git add package.json package-lock.json
git commit -m "Update Vite to 6.1.6 to fix security vulnerability"
```

### Priority 3: Cleanup
Decision needed on `@google/genai`:
- [ ] Implement the Gemini service, OR
- [ ] Remove the unused dependency

```bash
# If removing:
npm uninstall @google/genai
git add package.json package-lock.json
git commit -m "Remove unused @google/genai dependency"
```

### Priority 4: Future Consideration
When ready for breaking changes:
```bash
# Upgrade to latest Vite
npm install vite@^7.3.0
# Review breaking changes and update code accordingly
```

---

## 6. Dependency Health Metrics

| Metric | Status | Notes |
|--------|--------|-------|
| Total Dependencies | 4 prod + 7 dev | ✅ Minimal |
| Outdated Packages | 3/11 (27%) | ⚠️ Update recommended |
| Security Vulnerabilities | 1 moderate | ⚠️ Dev-only impact |
| Unused Dependencies | 1 suspected | ⚠️ Needs verification |
| Bundle Bloat | None detected | ✅ Excellent |
| Maintenance Burden | Low | ✅ All packages actively maintained |

---

## 7. Best Practices Going Forward

1. **Regular Updates:** Run `npm outdated` monthly
2. **Security Scanning:** Run `npm audit` before each release
3. **Dependency Review:** Question every new dependency
4. **Lock File:** Keep `package-lock.json` in version control (already done ✅)
5. **Bundle Analysis:** Periodically check production bundle size

---

## Conclusion

This project demonstrates **excellent dependency management** with a minimal, focused set of packages. The main action items are straightforward updates and clarification on the Google GenAI package usage.

**Overall Grade: A-**

Deductions only for outdated React packages and the security advisory in the dev dependency (Vite/esbuild).
