# Test Plan

## Scope
- Backend checkout and authentication flows introduced in the latest changes, including order preview, checkout, payment confirmation, and authenticated order history.
- Basic product configuration and health endpoints.

## Environments
- Backend: FastAPI app (local execution via `pytest` and `TestClient`).
- Authentication: Google sign-in mocked in tests via `id_token.verify_oauth2_token` patching with `GOOGLE_CLIENT_ID` set to `test-client`.

## Test Cases
1. **Health endpoint**
   - Send `GET /health`.
   - Expect HTTP 200 with `{ "status": "ok" }`.

2. **Product configuration**
   - Send `GET /config/products`.
   - Expect HTTP 200 with a list containing entries such as `muffin` that expose display name and wait time fields.

3. **Order preview validation (per-order limit)**
   - Send `POST /orders/preview` with a muffin quantity above the per-order maximum (e.g., 100).
   - Expect HTTP 200 with `is_valid=false` and an error mentioning the maximum quantity.

4. **Checkout and payment confirmation flow (authenticated)**
   - Mock Google token verification to return a known user, call `POST /auth/google` to obtain a bearer token, and create a checkout via `POST /checkout` with valid payload.
   - Expect checkout response to include an order in `pending_payment` status, tied to the authenticated user, plus a `pending` payment session.
   - Call `POST /payments/{order_id}/confirm` with the same token.
   - Expect HTTP 200 with order status updated to `paid` and a non-empty payment reference.
   - Fetch `GET /orders/me` with the token and expect the confirmed order to appear with `paid` status.

5. **Order history requires authentication**
   - Send `GET /orders/me` without credentials.
   - Expect HTTP 401.

## Execution
- Automated: `pytest` from the `backend` directory.

## Results
- All automated tests pass (see test output in the Testing section of the final report).
