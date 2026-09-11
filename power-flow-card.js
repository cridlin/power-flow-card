import { LitElement, html, css, svg } from "https://unpkg.com/lit?module";

class PowerFlowCard extends LitElement {
  static get properties() {
    return {
      hass: {
        type: Object,
      }, // Home Assistant object (for state)
      config: {
        type: Object,
      }, // User configuration (entities)
    };
  }

  constructor() {
    super();
    this.svgPaths = {
      primary:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGNsaXBQYXRoIGlkPSJfY2xpcDEiPgogICAgICAgICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNjEyIiBoZWlnaHQ9Ijc5MiIvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICAgICAgPGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwMSkiPgogICAgICAgICAgICA8ZyBpZD0icG93ZXJsaW5lLWdyaWQiIHNlcmlmOmlkPSJwb3dlcmxpbmUgZ3JpZCIgdHJhbnNmb3JtPSJtYXRyaXgoMS4wNzQ3NjYsMCwwLDIuMDk1NTExLDAsLTQyNS4wNzU4NjQpIj4KICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMzc2Ljk0NzksNDQxLjQ4OTYpIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMCwwTDMuMDEyLDBMMCwwWiIgc3R5bGU9ImZpbGw6d2hpdGU7ZmlsbC1ydWxlOm5vbnplcm87Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgtMSwwLDAsMSwzNzYuOTQ3OCw0NDEuNDg5MykiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0tMy4wMTIsMEwwLDAiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxcHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDM3OC42MjA5LDU3MC42NjUzKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsLTEyOS4xNzZDMCwtMTI5LjE3NiAwLjQzOCwtMTEwLjUyMiAtMC4xNjcsLTEwMS4zNjRDLTAuNjE3LC05NC41NTggNi4yMjYsLTkyLjExMSA5LjAzNSwtODkuNzZDMTUuNjI0LC04NC4yNDggNTAuNjU2LC03MC43NzYgNTAuNjU2LC03MC43NzZDNTAuNjU2LC03MC43NzYgNjUuMTUxLC02NS4xMjkgNTUuMzYyLC02Mi44N0M0NS41NzQsLTYwLjYxMSAtMjg1LjYyNSwwIC0yODUuNjI1LDAiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxMjcsMTI3LDEyNyk7c3Ryb2tlLXdpZHRoOjVweDsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==", // grid_line.svg
      out: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGNsaXBQYXRoIGlkPSJfY2xpcDEiPgogICAgICAgICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNjEyIiBoZWlnaHQ9Ijc5MiIvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICAgICAgPGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwMSkiPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjA3NDc2NiwwLDAsMi4wOTU1MTEsNDEzLjAyMzY3NSw2MTQuMzU4MDU4KSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0icG93ZXJsaW5lLW91dHNpZGUiIHNlcmlmOmlkPSJwb3dlcmxpbmUgb3V0c2lkZSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsLTcxLjIzMUwxNy44OCwtNzQuNDQ1QzE3Ljg4LC03NC40NDUgMjIuOTYyLC03My41MDQgMjMuMjQ0LC02Ny4xOThDMjMuNTI3LC02MC44OTMgMjQuNzA5LC0yNS4wMDIgMjQuNzA5LC0yNS4wMDJDMjQuNzA5LC0yNS4wMDIgMjYuOTE1LC0yMS4wODEgMzAuMzAzLC0xOS42NjlDMzIuMjkyLC0xOC44NCA1MC41MzUsLTExLjAwNCA2NS4yNiwtNC42NzRDNzEuMTQsLTIuMTQ3IDc2LjQ2LDAuMTQxIDc5Ljk1OSwxLjY0NkM4Mi43NTMsMi44NDcgODUuODI4LDMuMjE0IDg4LjgyNywyLjcwN0wxNzcuNzA4LC0xMi4zMjgiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxMjcsMTI3LDEyNyk7c3Ryb2tlLXdpZHRoOjVweDsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==", // grid_out.svg
      solar:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4wMDI0MzksLTIuMDk1NTA1LC0xLjA3NDc2MywtMC4wMDQ3NTYsNDQyLjg5NzM1OSwyOTIuMDEwNzU2KSI+CiAgICAgICAgICAgIDxnIGlkPSJwb3dlcmxpbmUtc29sYXIiIHNlcmlmOmlkPSJwb3dlcmxpbmUgc29sYXIiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTS02Ni42NTgsMzMuNDgyTC0yNy44ODIsMzMuNDgyQy0yMi4yODcsMzMuMjk0IC0xNC41OTEsMzMuNjggLTUuODg0LDM2LjE2M0M4LjM2Miw0MC4yMjYgMTQuOTg0LDQ4LjAxMyAyMC4wNzQsNTIuNjkxQzI0LjI5Nyw1Ni42NzQgMjkuMzM1LDYzLjExNSAzMy41NTgsNjcuMDk5IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpyZ2IoMTI3LDEyNywxMjcpO3N0cm9rZS13aWR0aDo1cHg7Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=", // solar_line.svg
      battery:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjM3NSAxNTg0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1taXRlcmxpbWl0OjEwOyI+PGcgaWQ9InBvd2VybGluZS1iYXR0ZXJ5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC00MCkiPjxwYXRoIGQ9Im0gMTU0OS4zMSw5MzguODM1IC05Ny43NTQsMTcuNjE3IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojN2Y3ZjdmO3N0cm9rZS13aWR0aDoyMC44M3B4Ii8+PC9nPjwvc3ZnPg==",
      ev: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjM3NSAxNTg0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1taXRlcmxpbWl0OjEwOyI+PGcgaWQ9InBvd2VybGluZS1ob3VzZSIgc3R5bGU9ImRpc3BsYXk6aW5saW5lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDY0KSI+PHBhdGggZD0ibSAxNTQ2Ljk0NTIsODg3Ljg1MTkyIC00MS4zNjAzLDcuMDM1NDYgYyAtNy45NDUsMi42NzM3NiAtMTYuOTQ3NCw0LjM1NDUgLTE3LjA1MDEsMjAuMTcyMTkgbCAxLjE5MzMsODEuNTYwNjIgYyAwLjA4NSw4Ljg2ODcxIC0yLjEyNzEsMTcuNTA1MzEuLTE3LjU4NTMsMjAuMDg4MTEgbCAtMjI4LjM5NTUsMzIuNzc3IC0yMDAuMDMwNiwtNzguMDc1MyAtMzcuNTMzLC0wLjIzMTU4IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojN2Y3ZjdmO3N0cm9rZS13aWR0aDoyMC44M3B4Ii8+PC9nPjwvc3ZnPg==",
      bg: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjEwMCUiCiAgIGhlaWdodD0iMTAwJSIKICAgdmlld0JveD0iMCAwIDIzNzUgMTU4NCIKICAgdmVyc2lvbj0iMS4xIgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IgogICBpZD0ic3ZnMzkiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImhvbWUuc3ZnIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjQuNCAoZGNhZjNlNywgMjAyNi0wNS0wNSkiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyI+PGRlZnMKICAgICBpZD0iZGVmczM5Ij48aW5rc2NhcGU6cGF0aC1lZmZlY3QKICAgICAgIGVmZmVjdD0iZmlsbGV0X2NoYW1mZXIiCiAgICAgICBpZD0icGF0aC1lZmZlY3QzOSIKICAgICAgIGlzX3Zpc2libGU9InRydWUiCiAgICAgICBscGV2ZXJzaW9uPSIxIgogICAgICAgbm9kZXNhdGVsbGl0ZXNfcGFyYW09IkYsMCwwLDEsMCwwLDAsMSBAIEYsMCwwLDEsMCwwLDAsMSBAIEYsMCwwLDEsMCwwLDAsMSBAIEYsMCwwLDEsMCwwLDAsMSBAIEYsMCwwLDEsMCwwLDAsMSBAIEYsMCwwLDEsMCwwLDAsMSBAIEYsMCwwLDEsMCwwLDAsMSBAIEYsMCwwLDEsMCwwLDAsMSBAIEYsMCwwLDEsMCwwLDAsMSBAIEYsMCwwLDEsMCwwLDAsMSBAIEYsMCwwLDEsMCwwLDAsMSBAIEYsMCwwLDEsMCwwLDAsMSBAIEYsMCwwLDEsMCwwLDAsMSBAIEYsMCwwLDEsMCwwLDAsMSIKICAgICAgIHJhZGl1cz0iMCIKICAgICAgIHVuaXQ9InB4IgogICAgICAgbWV0aG9kPSJhdXRvIgogICAgICAgbW9kZT0iRiIKICAgICAgIGNoYW1mZXJfc3RlcHM9IjEiCiAgICAgICBmbGV4aWJsZT0iZmFsc2UiCiAgICAgICB1c2Vfa25vdF9kaXN0YW5jZT0idHJ1ZSIKICAgICAgIGFwcGx5X25vX3JhZGl1cz0idHJ1ZSIKICAgICAgIGFwcGx5X3dpdGhfcmFkaXVzPSJ0cnVlIgogICAgICAgb25seV9zZWxlY3RlZD0iZmFsc2UiCiAgICAgICBoaWRlX2tub3RzPSJmYWxzZSIgLz48L2RlZnM+PHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXczOSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiMwMDAwMDAiCiAgICAgYm9yZGVyb3BhY2l0eT0iMC4yNSIKICAgICBpbmtzY2FwZTpzaG93cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjZDFkMWQxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjYxMzM2MTU2IgogICAgIGlua3NjYXBlOmN4PSIxMDc1LjIyMjMiCiAgICAgaW5rc2NhcGU6Y3k9IjEzODAuOTE0NyIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjI4ODAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTY3NiIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTEyIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItMTIiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJnMzkiPjxpbmtzY2FwZTpncmlkCiAgICAgICBpZD0iZ3JpZDM5IgogICAgICAgdW5pdHM9InB4IgogICAgICAgb3JpZ2lueD0iMCIKICAgICAgIG9yaWdpbnk9IjAiCiAgICAgICBzcGFjaW5neD0iMSIKICAgICAgIHNwYWNpbmd5PSIxIgogICAgICAgZW1wY29sb3I9IiMwMDk5ZTUiCiAgICAgICBlbXBvcGFjaXR5PSIwLjMwMTk2MDc4IgogICAgICAgY29sb3I9IiMwMDk5ZTUiCiAgICAgICBvcGFjaXR5PSIwLjE0OTAxOTYxIgogICAgICAgZW1wc3BhY2luZz0iNSIKICAgICAgIGVuYWJsZWQ9InRydWUiCiAgICAgICB2aXNpYmxlPSJmYWxzZSIgLz48L3NvZGlwb2RpOm5hbWVkdmlldz48cmVjdAogICAgIGlkPSJTZWl0ZS0yIgogICAgIHNlcmlmOmlkPSJTZWl0ZSAyIgogICAgIHg9IjAiCiAgICAgeT0iMCIKICAgICB3aWR0aD0iMjM3NSIKICAgICBoZWlnaHQ9IjE1ODMuMzMzIgogICAgIHN0eWxlPSJmaWxsOm5vbmU7IgogICAgIGlua3NjYXBlOmxhYmVsPSJTZWl0ZS0yIiAvPjxjbGlwUGF0aAogICAgIGlkPSJfY2xpcDEiPjxyZWN0CiAgICAgICB4PSIwIgogICAgICAgeT0iMCIKICAgICAgIHdpZHRoPSIyMzc1IgogICAgICAgaGVpZ2h0PSIxNTgzLjMzMyIKICAgICAgIGlkPSJyZWN0MSIgLz48L2NsaXBQYXRoPjxnCiAgICAgY2xpcC1wYXRoPSJ1cmwoI19jbGlwMSkiCiAgICAgaWQ9ImczOSI+PGcKICAgICAgIGlkPSJMYXllci0xIgogICAgICAgc2VyaWY6aWQ9IkxheWVyIDEiCiAgICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiIC8+PGcKICAgICAgIGlkPSJob3VzZSI+PHBhdGgKICAgICAgICAgZD0iTTEwNDAuNDIyLDExMTMuNzM5bDE5Ny42NDYsODIuMzU0bDkwNS44ODMsLTE1Mi45NDJsMCwtNDQxLjIxMmwtNDAyLjM1NCwtMjY5LjM3NWwtNTAzLjUyOSw0NDIuMzU0bC0yMDkuNTkyLC04Ny41NjdsLTQ2OC4wNTQsOTQuNjI1bC0zNTIuMDg3LC0xNDUuODgzbDAsMzk3LjY0NmwyOTAuOTEyLDEzMS43NjdjMCwwIDEwNS44ODMsNTguODIxIDEwOC4yMzMsNy4wNThjMi4zNTQsLTUxLjc2NyAtMi4zNSwtMzQ4LjIzNyAtMi4zNSwtMzQ4LjIzN2w0MDIuMzUsLTc0LjkyMWwtMi4zNTQsMzY0LjMzM2wzNS4yOTYsMFoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMyMDI3MzM7ZmlsbC1ydWxlOm5vbnplcm87IgogICAgICAgICBpZD0icGF0aDEiIC8+PC9nPjxnCiAgICAgICBpZD0icm9vZiI+PHBhdGgKICAgICAgICAgZD0iTTEzNDEuMTIxLDY4NC45NTVsMzYyLjgyOSwtMzE0Ljc0MmMwLDAgMjUuODgzLC0zNS4yOTYgODQuNzA0LDBjNTguODI1LDM1LjI5MiA0MjEuMTc5LDI3NS4yOTIgNDIxLjE3OSwyNzUuMjkyYzAsMCA0Ny4wNTgsLTcuMDU4IDIxLjE3NSwtMzAuNTg3Yy0yNS44ODMsLTIzLjUyOSAtNDc3LjY0NiwtMzIwIC00NzcuNjQ2LC0zMjBsLTc0NS44ODMsLTI3MC41ODhsLTUwOC4yMzMsNDQyLjM1bDczOC44MjEsMzA4LjIzOGMwLDAgLTAuOTA4LDAuMjIxIDEwMy4wNTQsLTg5Ljk2MyIKICAgICAgICAgc3R5bGU9ImZpbGw6IzE5MjAyYztmaWxsLXJ1bGU6bm9uemVybzsiCiAgICAgICAgIGlkPSJwYXRoMiIgLz48cGF0aAogICAgICAgICBkPSJNNTUxLjg4NSw0ODguNjQybDQ3Ni41OTIsMTk4LjcwOGwtNDY4LjA1NCw5NC42MjVsLTM1Mi4wODgsLTE0NS44ODNsMCwtOTEuNzYybDM0My41NSwtNTUuNjg4WiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzFhMjIyZDtmaWxsLXJ1bGU6bm9uemVybzsiCiAgICAgICAgIGlkPSJwYXRoMyIgLz48L2c+PGcKICAgICAgIGlkPSJyb29mLWdhcmFnZSIKICAgICAgIHNlcmlmOmlkPSJyb29mIGdhcmFnZSIKICAgICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZSIgLz48ZwogICAgICAgaWQ9IndpbmRvd3MiCiAgICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPjxwYXRoCiAgICAgICAgIGQ9Im0gMTcxLjk1LDQ4OC42NDIgdiAyMjUuMDk2IGwgMTM4LjgyNSwtMjIuNjk5IHYgLTExNS43MyB6IgogICAgICAgICBzdHlsZT0iZmlsbDojZmZlZGI4O2ZpbGwtcnVsZTpub256ZXJvIgogICAgICAgICBpZD0icGF0aDQiIC8+PHBhdGgKICAgICAgICAgZD0iTSAxOTM5LjIyNCw2ODkuNDI2IDIwNjcuODIsNjY3Ljk2OCAxOTM5LjYzOCw1ODMuMzM1IFoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmVkYjg7ZmlsbC1ydWxlOm5vbnplcm8iCiAgICAgICAgIGlkPSJwYXRoNSIgLz48cGF0aAogICAgICAgICBkPSJtIDE3ODguNjU2LDcyOC41MzkgMTM4LjgyNSwtMjIuNSB2IDE1NS45MzcgbCAtMTM4LjgyNSwyMS4xNDciCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmVkYjg7ZmlsbC1ydWxlOm5vbnplcm8iCiAgICAgICAgIGlkPSJwYXRoNiIgLz48cGF0aAogICAgICAgICBkPSJtIDE5MzkuMjI0LDcwNC4zNzIgMTI4LjU5NiwtMjEuMjUgdiAxNTguMDcgbCAtMTI4LjU5NiwxOS4wMTQgViA3MDQuMzczIFoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmVkYjg7ZmlsbC1ydWxlOm5vbnplcm8iCiAgICAgICAgIGlkPSJwYXRoNyIgLz48cGF0aAogICAgICAgICBkPSJtIDE3ODguNjU2LDg5OC4wNTMgdiAxMjYuMjc1IGwgMTM4LjgyNSwtMjMuOTIxIFYgODc2Ljg3OCBaIgogICAgICAgICBzdHlsZT0iZmlsbDojZmZlZGI4O2ZpbGwtcnVsZTpub256ZXJvIgogICAgICAgICBpZD0icGF0aDgiIC8+PHBhdGgKICAgICAgICAgZD0ibSAxOTM5LjIyNCw4NzUuMDE1IDAuODA0LDEyMy40MzEgMTI2LjI3NSwtMjAuNzgzIDEuNTE3LC0xMjEuNjI0IHoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmVkYjg7ZmlsbC1ydWxlOm5vbnplcm8iCiAgICAgICAgIGlkPSJwYXRoOSIgLz48cGF0aAogICAgICAgICBkPSJtIDI5NS43MTgsNzY3Ljg1NyB2IDkwLjk3OSBsIDgwLjM5MiwzNC4xMTcgdiAtOTIuNTQ2IHoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmVkYjg7ZmlsbC1ydWxlOm5vbnplcm8iCiAgICAgICAgIGlkPSJwYXRoMTAiIC8+PHBhdGgKICAgICAgICAgZD0ibSAzODcuNSw4MDQuNzg5IC0wLjAwNyw5My4wMTEgNzcuNjM1LDMzLjA1NSBWIDgzOC4wNTEgTCAzODcuNSw4MDQuNzg4IFoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmVkYjg7ZmlsbC1ydWxlOm5vbnplcm8iCiAgICAgICAgIGlkPSJwYXRoMTEiIC8+PC9nPjxnCiAgICAgICBpZD0ic29sYXIiPjxwYXRoCiAgICAgICAgIGQ9Ik0xMDE1LjIzMSwxMDIuMzY4bC05NS43MTcsODEuNjVsMTA4LjI2Nyw0MC43MDRsOTcuNTIxLC04Mi44OTZsLTExMC4wNzEsLTM5LjQ1OFoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiM5ZTk2ODI7ZmlsbC1ydWxlOm5vbnplcm87IgogICAgICAgICBpZD0icGF0aDEyIiAvPjxwYXRoCiAgICAgICAgIGQ9Ik05MTUuNzA0LDEgODcuNThsLTk3LjQyMSw4My4xMDRsMTA4LjI2Nyw0MC43MDRsOTcuNTIxLC04Mi44OTZsLTEwOC4zNjcsLTQwLjkxMloiCiAgICAgICAgIHN0eWxlPSJmaWxsOiM5ZTk2ODI7ZmlsbC1ydWxlOm5vbnplcm87IgogICAgICAgICBpZD0icGF0aDEzIiAvPjxwYXRoCiAgICAgICAgIGQ9Ik04MTIuODEsMjc0LjA1MWwtOTcuNDIxLDgzLjEwNGwxMDguMjY3LDQwLjcwNGw5Ny41MjEsLTgyLjg5NmwtMTA4LjM2NywtNDAuOTEzWiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzllOTY4MjtmaWxsLXJ1bGU6bm9uemVybzsiCiAgICAgICAgIGlkPSJwYXRoMTQiIC8+PHBhdGgKICAgICAgICAgZD0iTTExMzAuNTI1LDE0NS4zMWwtOTUuNzE3LDgxLjY1bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMTAuMDcxLC0zOS40NThaIgogICAgICAgICBzdHlsZT0iZmlsbDojOWU5NjgyO2ZpbGwtcnVsZTpub256ZXJvOyIKICAgICAgICAgaWQ9InBhdGgxNSIgLz48cGF0aAogICAgICAgICBkPSJNMTAzMC45OTgsMjMwLjUyMWwtOTcuNDIxLDgzLjEwNGwxMDguMjY3LDQwLjcwNGw5Ny41MjEsLTgyLjg5NmwtMTA4LjM2NywtNDAuOTEyWiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzllOTY4MjtmaWxsLXJ1bGU6bm9uemVybzsiCiAgICAgICAgIGlkPSJwYXRoMTYiIC8+PHBhdGgKICAgICAgICAgZD0iTTkyOC4xMDQsMzE2Ljk5MmwtOTcuNDIxLDgzLjEwNGwxMDguMjY3LDQwLjcwNGw5Ny41MjEsLTgyLjg5NmwtMTA4LjM2NywtNDAuOTEyWiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzllOTY4MjtmaWxsLXJ1bGU6bm9uemVybzsiCiAgICAgICAgIGlkPSJwYXRoMTciIC8+PHBhdGgKICAgICAgICAgZD0iTTEyNDYuNDA3LDE4OC4yMWwtOTUuNzE3LDgxLjY1bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMTAuMDcxLC0zOS40NThaIgogICAgICAgICBzdHlsZT0iZmlsbDojOWU5NjgyO2ZpbGwtcnVsZTpub256ZXJvOyIKICAgICAgICAgaWQ9InBhdGgxOCIgLz48cGF0aAogICAgICAgICBkPSJNMTE0Ni44OCwyNzMuNDIybC05Ny40MjEsODMuMTA0bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMDguMzY3LC00MC45MTNaIgogICAgICAgICBzdHlsZT0iZmlsbDojOWU5NjgyO2ZpbGwtcnVsZTpub256ZXJvOyIKICAgICAgICAgaWQ9InBhdGgxOSIgLz48cGF0aAogICAgICAgICBkPSJNMTA0My45ODYsMzU5Ljg5MmwtOTcuNDIxLDgzLjEwNGwxMDguMjY3LDQwLjcwNGw5Ny41MjEsLTgyLjg5NmwtMTA4LjM2NywtNDAuOTEyWiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzllOTY4MjtmaWxsLXJ1bGU6bm9uemVybzsiCiAgICAgICAgIGlkPSJwYXRoMjAiIC8+PHBhdGgKICAgICAgICAgZD0iTTEzNjEuNywyMzEuMTUxbC05NS43MTcsODEuNjVsMTA4LjI2Nyw0MC43MDRsOTcuNTIxLC04Mi44OTZsLTExMC4wNzEsLTM5LjQ1OFoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiM5ZTk2ODI7ZmlsbC1ydWxlOm5vbnplcm87IgogICAgICAgICBpZD0icGF0aDIxIiAvPjxwYXRoCiAgICAgICAgIGQ9Ik0xMjYyLjE3NCwzMTYuMzYzbC05Ny40MjEsODMuMTA0bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMDguMzY3LC00MC45MTJaIgogICAgICAgICBzdHlsZT0iZmlsbDojOWU5NjgyO2ZpbGwtcnVsZTpub256ZXJvOyIKICAgICAgICAgaWQ9InBhdGgyMiIgLz48cGF0aAogICAgICAgICBkPSJNMTE1OS4yOCw0MDIuODMzbC05Ny40MjEsODMuMTA0bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMDguMzY3LC00MC45MTJaIgogICAgICAgICBzdHlsZT0iZmlsbDojOWU5NjgyO2ZpbGwtcnVsZTpub256ZXJvOyIKICAgICAgICAgaWQ9InBhdGgyMyIgLz48cGF0aAogICAgICAgICBkPSJNMTQ3NS45ODQsMjc0LjA1MWwtOTUuNzE3LDgxLjY1bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMTAuMDcxLC0zOS40NThaIgogICAgICAgICBzdHlsZT0iZmlsbDojOWU5NjgyO2ZpbGwtcnVsZTpub256ZXJvOyIKICAgICAgICAgaWQ9InBhdGgyNCIgLz48cGF0aAogICAgICAgICBkPSJNMTM3Ni40NTcsMzU5LjI2M2wtOTcuNDIxLDgzLjEwNGwxMDguMjY3LDQwLjcwNGw5Ny41MjEsLTgyLjg5NmwtMTA4LjM2NywtNDAuOTEyWiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzllOTY4MjtmaWxsLXJ1bGU6bm9uemVybzsiCiAgICAgICAgIGlkPSJwYXRoMjUiIC8+PHBhdGgKICAgICAgICAgZD0iTTEyNzMuNTYzLDQ0NS43MzNsLTk3LjQyMSw4My4xMDRsMTA4LjI2Nyw0MC43MDRsOTcuNTIxLC04Mi44OTZsLTEwOC4zNjcsLTQwLjkxMloiCiAgICAgICAgIHN0eWxlPSJmaWxsOiM5ZTk2ODI7ZmlsbC1ydWxlOm5vbnplcm87IgogICAgICAgICBpZD0icGF0aDI2IiAvPjwvZz48ZwogICAgICAgaWQ9InBvd2VybGluZS1zb2xhciIKICAgICAgIHNlcmlmOmlkPSJwb3dlcmxpbmUgc29sYXIiPjxwYXRoCiAgICAgICAgIGQ9Ik0xNTc2Ljg5MSw4NTguMDUzbDAuMzY3LC0xNjEuNTY3YzAuODM4LC0yMy4zMTIgLTAuNywtNTUuMzgzIC0xMC45NjIsLTkxLjY4M2MtMTYuNzkyLC01OS4zOTYgLTQ5LjE3NSwtODcuMDYyIC02OC42MjEsLTEwOC4zMTdjLTE2LjU1NCwtMTcuNjMzIC00My4zNDYsLTM4LjY4MyAtNTkuOTA0LC01Ni4zMTciCiAgICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOiM3ZjdmN2Y7c3Ryb2tlLXdpZHRoOjIwLjgzcHg7IgogICAgICAgICBpZD0icGF0aDI3IiAvPjwvZz48ZwogICAgICAgaWQ9InBvd2VybGluZS1iYXR0ZXJ5IgogICAgICAgc2VyaWY6aWQ9InBvd2VybGluZSBiYXR0ZXJ5IgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNDApIj48cGF0aAogICAgICAgICBkPSJtIDE1NDkuMzEsOTM4LjgzNSAtOTcuNzU0LDE3LjYxNyIKICAgICAgICAgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6IzdmN2Y3ZjtzdHJva2Utd2lkdGg6MjAuODNweCIKICAgICAgICAgaWQ9InBhdGgyOCIKICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjYyIgLz48L2c+PGcKICAgICAgIGlkPSJwb3dlcmxpbmUtZ3JpZCIKICAgICAgIHNlcmlmOmlkPSJwb3dlcmxpbmUgZ3JpZCI+PHBhdGgKICAgICAgICAgZD0iTTE1NzAuNjE2LDk5NC4zMjlsMTIuNTUsMGwtMTIuNTUsMFoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOm5vbnplcm87IgogICAgICAgICBpZD0icGF0aDI5IiAvPjxwYXRoCiAgICAgICAgIGQ9Ik0xNTgzLjE2Niw5OTQuMzI3bC0xMi41NSwwIgogICAgICAgICBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMDAwO3N0cm9rZS13aWR0aDo0LjE3cHg7IgogICAgICAgICBpZD0icGF0aDMwIiAvPjxwYXRoCiAgICAgICAgIGQ9Ik0xNTc3LjU4Nyw5OTQuMzI3YzAsMCAxLjgyNSw3Ny43MjUgLTAuNjk2LDExNS44ODNjLTEuODc1LDI4LjM1OCAyNi42MzgsMzguNTU0IDM4LjM0Miw0OC4zNWMyNy40NTQsMjIuOTY3IDE3My40MjEsNzkuMSAxNzMuNDIxLDc5LjFjMCwwIDYwLjM5NiwyMy41MjkgMTkuNjA4LDMyLjk0MmMtNDAuNzgzLDkuNDEyIC0xNDIwLjc3OSwyNjEuOTU4IC0xNDIwLjc3OSwyNjEuOTU4IgogICAgICAgICBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojN2Y3ZjdmO3N0cm9rZS13aWR0aDoyMC44M3B4OyIKICAgICAgICAgaWQ9InBhdGgzMSIgLz48L2c+PGcKICAgICAgIGlkPSJwb3dlcmxpbmUtb3V0c2lkZSIKICAgICAgIHNlcmlmOmlkPSJwb3dlcmxpbmUgb3V0c2lkZSI+PHBhdGgKICAgICAgICAgZD0iTTE2MDEuMjE2LDkyNC43OGw3NC41LC0xMy4zOTJjMCwwIDIxLjE3NSwzLjkyMSAyMi4zNSwzMC4xOTZjMS4xNzksMjYuMjcxIDYuMTA0LDE3NS44MTcgNi4xMDQsMTc1LjgxN2MwLDAgOS4xOTIsMTYuMzM3IDIzLjMwOCwyMi4yMjFjOC4yODcsMy40NTQgODQuMywzNi4xMDQgMTQ1LjY1NCw2Mi40NzljMjQuNSwxMC41MjkgNDYuNjY3LDIwLjA2MiA2MS4yNDYsMjYuMzMzYzExLjY0Miw1LjAwNCAyNC40NTQsNi41MzMgMzYuOTUsNC40MjFsMzcwLjMzOCwtNjIuNjQ2IgogICAgICAgICBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojN2Y3ZjdmO3N0cm9rZS13aWR0aDoyMC44M3B4OyIKICAgICAgICAgaWQ9InBhdGgzMiIgLz48L2c+PGcKICAgICAgIGlkPSJwb3dlcmxpbmUtaG91c2UiCiAgICAgICBzZXJpZjppZD0icG93ZXJsaW5lIGhvdXNlIgogICAgICAgc3R5bGU9ImRpc3BsYXk6aW5saW5lIgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCw2NCkiPjxwYXRoCiAgICAgICAgIGQ9Im0gMTU0Ni45NDUyLDg4Ny44NTE5MiAtNDEuMzYwMyw3LjAzNTQ2IGMgLTcuOTQ1LDIuNjczNzYgLTE2Ljk0NzQsNC4zNTQ1IC0xNy4wNTAxLDIwLjE3MjE5IGwgMS4xOTMzLDgxLjU2MDYyIGMgMC4wODUsOC44Njg3MSAtMi4xMjcxLDE3LjUwNTMxIC0xNy41ODUzLDIwLjA4ODExIGwgLTIyOC4zOTU1LDMyLjc3NyAtMjAwLjAzMDYsLTc4LjA3NTMgLTM3LjUzMywtMC4yMzE1OCIKICAgICAgICAgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6IzdmN2Y3ZjtzdHJva2Utd2lkdGg6MjAuODNweCIKICAgICAgICAgaWQ9InBhdGgzMyIKICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjY2NjYyIgLz48L2c+PGcKICAgICAgIGlkPSJpbnZlcnRlciI+PHBhdGgKICAgICAgICAgZD0iTTE1OTEuNDI2LDk5NC4zMjdsLTI3LjY3OSwwYy0xMy4xNDYsMCAtMjMuODA4LC0xMC42NTggLTIzLjgwOCwtMjMuODA4bDAsLTg2LjVjMCwtMTMuMTUgMTAuNjYyLC0yMy44MDggMjMuODA4LC0yMy44MDhsMjcuNjc5LDBjMTMuMTUsMCAyMy44MDgsMTAuNjU4IDIzLjgwOCwyMy44MDhsMCw4Ni41YzAsMTMuMTUgLTEwLjY1OCwyMy44MDggLTIzLjgwOCwyMy44MDgiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwZDE1MWM7ZmlsbC1ydWxlOm5vbnplcm87IgogICAgICAgICBpZD0icGF0aDM0IiAvPjwvZz48ZwogICAgICAgaWQ9ImNhciI+PHBhdGgKICAgICAgICAgZD0iTTYwNi42Miw5MzAuODU1bDAuODYyLDI0MS43MDhsMTM4LjgyMSwtMzIuOTQyYzAsMCA1Mi43NjcsLTQ0Ljc2MyA1NC45MDQsLTY0LjcwOGMyLjczOCwtMTkuOTQyIDAuMjQyLC0yMS41NDIgLTUuNDkyLC0yNS40ODdjLTUuNzMzLC0zLjk1IC02LjgyNSwtMTMuOTc1IC00Ni4yNzUsLTE2LjA3OWMtMzkuNDUsLTIuMTA0IC04Ny4wNTgsLTQ1Ljg5NiAtODcuMDU4LC00NS44OTZsLTU1Ljc2MywtNTYuNTk2WiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzBjMTExODtmaWxsLXJ1bGU6bm9uemVybzsiCiAgICAgICAgIGlkPSJwYXRoMzUiIC8+PHBhdGgKICAgICAgICAgZD0iTTY1Mi45NzIsMTA0OC4yNDljMCwwIC0zNi4wNzksMjEuOTYzIC0yMCw2My45MjFjMTYuMDc5LDQxLjk2MyA1MS43NjcsMzguMDQyIDUxLjc2NywzOC4wNDJjMCwwIDI5LjQwOCwtNi4yNzUgMjkuNDA4LC0xNi40NzFsMCwtNS4xbC0yMCwwYzAsMCAyLjc0NiwtMjAuNzgzIC0wLjM5MiwtMzQuNTA4Yy0zLjEzNywtMTMuNzI1IC01Ljg4MywtMjkuODA0IC0xNC4xMTcsLTM2LjQ3MWMtOC4yMzMsLTYuNjY3IC0xMy4zMzMsLTEzLjMzMyAtMjYuNjY3LC05LjQxMyIKICAgICAgICAgc3R5bGU9ImZpbGw6IzE2MWIyNTtmaWxsLXJ1bGU6bm9uemVybzsiCiAgICAgICAgIGlkPSJwYXRoMzYiIC8+PHBhdGgKICAgICAgICAgZD0iTTYwNS43MTUsODYzLjU4OGMwLDAgNTAuMzk2LC0xNi41MTcgODguODI1LC0xNy4zYzM4LjQzMywtMC43ODMgNjUuODgzLDE0LjExNyA3Ny42NDYsMjUuODgzYzExLjc2NywxMS43NjIgNTMuMzMzLDY0LjMxMiA4Mi4zNTQsODAuNzgzYzI5LjAyMSwxNi40NzEgODEuNTY3LDM1LjI5NiA4My4xMzcsOTYuNDcxYzEuNTY3LDYxLjE3NSAtNTYuNDcxLDU4LjAzNyAtNTYuNDcxLDU4LjAzN2wtMTM0LjksMzIuMTU4YzAsMCA0OS40MDgsLTQyLjM1NCA1MS43NjMsLTcxLjM3MWMyLjM1NCwtMjkuMDIxIC00Ni4yNzUsLTI3LjQ1NCAtNDYuMjc1LC0yNy40NTRjMCwwIC0yMy41MjksLTEuNTY3IC01Ni40NzEsLTE5LjYwOGMtMzIuOTQyLC0xOC4wMzggLTg4LjcwNCwtOTAuMzMzIC04OC43MDQsLTkwLjMzM2wtMC45MDQsLTY3LjI2N1oiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMxNjFiMjU7ZmlsbC1ydWxlOm5vbnplcm87IgogICAgICAgICBpZD0icGF0aDM3IiAvPjwvZz48ZwogICAgICAgaWQ9ImJhdHRlcnkiCiAgICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPjxwYXRoCiAgICAgICAgIGQ9Im0gMTM5Mi41NzgsODM1LjMwOCA1OC4yMzMsLTUuNDkyIGMgMCwwIDUuNDkyLC0xLjM3MSA2LjA3OSw1LjQ5MiAwLjk0MiwxMC45NjcgMC4wMTMsMjA3LjA1OCAwLjAxMywyMDcuMDU4IDAsMCAtMi4zNjIsNi4yNzUgLTkuNDI1LDcuODQyIC03LjA1OCwxLjU3MSAtMTA3LjQ1LDE0LjkwNCAtMTA3LjQ1LDE0LjkwNCAwLDAgLTEwLjk3OSwtMS41NzEgLTExLjc2MywtMTIuNTUgLTAuNzgzLC0xMC45NzkgMCwtMjAyLjM1NCAwLC0yMDIuMzU0IDAsMCAtMC42NSwtNi44MDQgNy45NzksLTkuMTU4IDguNjI1LC0yLjM1NCA1Ni4zMzMsLTUuNzQyIDU2LjMzMywtNS43NDIiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwZDE4MjQ7ZmlsbC1ydWxlOm5vbnplcm8IgogICAgICAgICBpZD0icGF0aDM4IiAvPjxwYXRoCiAgICAgICAgIGQ9Im0gMTQwMS4yMDUsOTAxLjE5IC0yNS44ODMsNTAuOTc5IGggMTcuMTU0IHYgMjkuODA0IGwgMjQuNDE3LC00NC43MDQgLTE0LjkwNCw0LjMxMiAtMC43ODMsLTQwLjM5MiB6IgogICAgICAgICBzdHlsZT0iZmlsbDojNjhjY2Y4O2ZpbGwtcnVsZTpub256ZXJvIgogICAgICAgICBpZD0icGF0aDM5IiAvPjwvZz48L2c+PC9zdmc+Cg=="
    };


    this.lineConfig = [
      {
        id: "solar",
        type: "solar",
        entity_key: "solar_power",
        reverse: true,
        container: "solar",
      },
      {
        id: "battery",
        type: "bat-charge",
        entity_key: "battery_charge_power",
        reverse: false,
        container: "battery",
        pathKey: "battery",
      },
      {
        id: "ev",
        type: "ev",
        entity_key: "ev_charge_power",
        reverse: false,
        container: "ev",
      },
      {
        id: "grid-import",
        type: "grid-import",
        entity_key: "grid_import_power",
        reverse: true,
        container: "primary",
        pathKey: "primary",
      },
      {
        id: "grid-export",
        type: "grid-export",
        entity_key: "grid_export_power",
        reverse: false,
        container: "out",
        pathKey: "out",
      },

      {
        id: "bg",
        type: "bg",
        pathKey: "bg",
        isBackground: true,
        container: "bg",
      },
    ];

    this.isInitialized = false;

    this.descriptorAnchors = {
      solar: { lineX: 523, lineY1: -38, lineY2: 137, textX: 537 },
      grid: { lineX: 171, lineY1: -38, lineY2: 500, textX: 185 },
      battery: { lineX: 672, lineY1: -38, lineY2: 400, textX: 686 },
      ev: { lineX: 365, lineY1: -38, lineY2: 315, textX: 379 },
      home: { lineX: 888, lineY1: -38, lineY2: 255, textX: 902 },
    };
  }

  firstUpdated() {
    this.lineContainers = {
      bg: this.shadowRoot.getElementById("svg-container-bg"),
      solar: this.shadowRoot.getElementById("svg-container-solar"),
      battery: this.shadowRoot.getElementById("svg-container-battery"),
      ev: this.shadowRoot.getElementById("svg-container-ev"),
      primary: this.shadowRoot.getElementById("svg-container-primary"),
      out: this.shadowRoot.getElementById("svg-container-out"),
    };
    this.loadAllSVGs();
    this.isInitialized = true;
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;
    this.requestUpdate("hass", oldHass);
    if (this.isInitialized) {
      this.updateFlow();
    }
  }

  ensureGlow(svgEl) {
    if (!svgEl.querySelector("#glow")) {
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );
      defs.innerHTML = `
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>`;
      svgEl.insertBefore(defs, svgEl.firstChild);
    }
  }

  processSVGString(text, containerEl, lineType) {
    containerEl.innerHTML = text;
    const svgEl = containerEl.querySelector("svg");
    if (!svgEl) return;

    this.ensureGlow(svgEl);

    svgEl
      .querySelectorAll("path, circle, rect, line, polyline, polygon")
      .forEach((el) => {
        if (el.nodeName === "rect") {
          return;
        }
        el.classList.add("anim-line", lineType);
        el.removeAttribute("stroke");
        el.style.removeProperty("stroke");
      });
  }

  async loadSVG(path, containerEl, lineType, isBackground) {
    try {
      if (!path) throw new Error(`No SVG path provided for ${lineType}`);

      let text;

      if (path.startsWith('data:image/svg+xml;base64,')) {
        const base64Data = path.substring(path.indexOf(',') + 1);
        text = atob(base64Data);
      } else {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`SVG load failed: ${response.status} ${response.statusText}`);
        text = await response.text();
      }

      if (isBackground) {
        containerEl.innerHTML = text;
      } else {
        this.processSVGString(text, containerEl, lineType);
      }
    } catch (err) {
      console.error(`Failed to load SVG for "${lineType}" from path "${path}":`, err);
      containerEl.innerHTML = `
                <p style="color:#f99; text-align:center; font-weight:bold;">
                    Error loading ${lineType} SVG
                </p>
            `;
    }
  }

  loadAllSVGs() {
    this.lineConfig.forEach((cfg) => {
      const pathKey = cfg.pathKey || cfg.type;
      const path = this.svgPaths[pathKey];

      const containerId = cfg.container || cfg.id;
      const container = this.lineContainers[containerId];

      if (path && container) {
        this.loadSVG(path, container, cfg.type, cfg.isBackground);
      }
    });
  }

  getEntityId(key) {
    if (!this.config) return null;
    if (this.config.entities && this.config.entities[key]) {
      return this.config.entities[key];
    }
    return this.config[key] || null;
  }

  getNormalizedPower(entityId) {
    if (!entityId || !this._hass || !this._hass.states[entityId]) return 0;
    const stateObj = this._hass.states[entityId];
    let val = parseFloat(stateObj.state);
    if (isNaN(val)) return 0;
    
    let unit = (stateObj.attributes.unit_of_measurement || "").toLowerCase().trim();
    
    if (!unit && typeof stateObj.state === 'string') {
        const lowerState = stateObj.state.toLowerCase();
        if (lowerState.includes("kw")) unit = "kw";
        else if (lowerState.includes("kva")) unit = "kva";
        else if (lowerState.includes("w")) unit = "w";
    }

    if (unit === "kw" || unit === "kwh" || unit === "kva" || unit.includes("kw")) {
      val *= 1000;
    }
    return val;
  }

  updateFlow() {
    const threshold = (this.config && this.config.threshold != null)
      ? (Number(this.config.threshold) || 10)
      : 10;
      
      this.lineConfig
      .filter((c) => c.entity_key || c.type)
      .forEach((cfg) => {
        const container = this.lineContainers[cfg.container || cfg.id];

        if (!container) return;

        let value = 0;
        let reverse = !!cfg.reverse;

        if (cfg.type === "bat-charge") {
          const chargeValue = this.getNormalizedPower(this.getEntityId("battery_charge_power"));
          const dischargeValue = this.getNormalizedPower(this.getEntityId("battery_discharge_power"));

          if (Math.abs(chargeValue) > threshold) {
            value = chargeValue;
            // Naturally reverse if the charge entity drops negative (single entity BESS support)
            reverse = chargeValue < 0;
          } else if (Math.abs(dischargeValue) > threshold) {
            value = dischargeValue;
            reverse = true;
          } else {
            value = 0;
          }

          // User override toggle
          if (this.config.invert_battery_flow) {
            reverse = !reverse;
          }
        } else {
          value = this.getNormalizedPower(this.getEntityId(cfg.entity_key));
        }

        const lines = container.querySelectorAll(".anim-line");
        const isActive = Math.abs(value) > threshold;

        let animationDuration = 3;
        
        if (this.config.dynamic_speed_enabled !== false) {
          const minSpeed = this.config.min_flow_speed || 5; 
          const maxSpeed = this.config.max_flow_speed || 1; 
          const minPower = this.config.min_power_threshold || 100; 
          const maxPower = this.config.max_power_threshold || 10000;
          
          const clampedPower = Math.max(minPower, Math.min(maxPower, Math.abs(value)));
          const speedRatio = (clampedPower - minPower) / (maxPower - minPower);
          animationDuration = minSpeed - (speedRatio * (minSpeed - maxSpeed));
        }

        lines.forEach((line) => {
          line.classList.toggle("flow-active", isActive);
          line.classList.toggle("flow-off", !isActive);
          line.classList.toggle("reverse-flow", reverse);
          
          if (isActive) {
            line.style.setProperty('--animation-duration', `${animationDuration}s`);
          }
        });
      });
  }

  setConfig(config) {
    if (!config.entities || Object.keys(config.entities).length === 0) {
      throw new Error(
        "You need to define entities for the power flow diagram."
      );
    }
    this.config = config;
  }

  static getConfigForm() {
    const buildDescriptorSchema = (title, prefix) => ({
      type: "expandable",
      name: "",
      title: title,
      schema: [
        { name: `${prefix}_descriptor_enabled`, selector: { boolean: {} } },
        { name: `${prefix}_descriptor_label`, selector: { text: {} } },
        
        // Primary
        { name: `${prefix}_tap_entity`, selector: { entity: {} } },
        { name: `${prefix}_descriptor_entity`, selector: { entity: {} } },
        { name: `${prefix}_display_unit`, selector: { text: {} } },
        { name: `${prefix}_unit_multiplier`, type: "float" },
        
        // Secondary
        { name: `${prefix}_secondary_entity`, selector: { entity: {} } },
        { name: `${prefix}_secondary_icon`, selector: { icon: {} } },
        { name: `${prefix}_secondary_display_unit`, selector: { text: {} } },
        { name: `${prefix}_secondary_unit_multiplier`, type: "float" },
      ],
    });

    return {
      schema: [
        { name: "name", selector: { text: {} } },
        { name: "threshold", type: "float" },
        { name: "invert_battery_flow", selector: { boolean: {} } },
        {
          type: "expandable",
          name: "",
          title: "Typography Settings",
          schema: [
            { name: "primary_font_size", type: "integer", default: 34 },
            { name: "secondary_font_size", type: "integer", default: 28 }
          ],
        },
        {
          type: "expandable",
          name: "",
          title: "Animation Speed Settings",
          schema: [
            { name: "dynamic_speed_enabled", selector: { boolean: {} } },
            { name: "min_flow_speed", type: "float", default: 5 },
            { name: "max_flow_speed", type: "float", default: 1 },
            { name: "min_power_threshold", type: "float", default: 100 },
            { name: "max_power_threshold", type: "float", default: 10000 },
          ],
        },
        {
          type: "expandable",
          name: "",
          title: "Global Value Formatting (Fallback)",
          schema: [
            { name: "display_unit", selector: { text: {} } },
            { name: "decimals_w", type: "integer", default: 0 },
            { name: "decimals_kw", type: "integer", default: 2 },
            { name: "decimals", type: "integer" },
            { name: "unit_multiplier", type: "float" },
            { name: "auto_kw_threshold", type: "float" },
          ],
        },
        {
          type: "expandable",
          name: "",
          title: "House Graphic Colors (Optional)",
          schema: [
            { name: "house_color_dark", selector: { text: {} } },
            { name: "roof_color_dark", selector: { text: {} } },
            { name: "house_color_light", selector: { text: {} } },
            { name: "roof_color_light", selector: { text: {} } },
          ],
        },
        {
          type: "expandable",
          name: "",
          title: "Line Colors (Optional)",
          schema: [
            { name: "solar_line_color", selector: { text: {} } },
            { name: "grid_import_line_color", selector: { text: {} } },
            { name: "grid_export_line_color", selector: { text: {} } },
            { name: "battery_charge_line_color", selector: { text: {} } },
            { name: "battery_discharge_line_color", selector: { text: {} } },
            { name: "ev_line_color", selector: { text: {} } },
          ],
        },
        {
          type: "grid",
          name: "entities",
          flatten: false,
          schema: [
            { name: "solar_power", selector: { entity: {} } },
            { name: "grid_import_power", selector: { entity: {} } },
            { name: "grid_export_power", selector: { entity: {} } },
            { name: "ev_charge_power", selector: { entity: {} } },
            { name: "battery_charge_power", selector: { entity: {} } },
            { name: "battery_discharge_power", selector: { entity: {} } },
          ],
        },
        buildDescriptorSchema("Solar Descriptor", "solar"),
        buildDescriptorSchema("Grid Descriptor", "grid"),
        buildDescriptorSchema("Battery Descriptor", "battery"),
        buildDescriptorSchema("EV Descriptor", "ev"),
        buildDescriptorSchema("Home Descriptor", "home"),
      ],
      
      computeLabel: (schema) => {
        const staticMap = {
          name: "Card title",
          threshold: "Active threshold (W)",
          "entities.solar_power": "Solar flow entity",
          "entities.grid_import_power": "Grid import flow entity",
          "entities.grid_export_power": "Grid export flow entity",
          "entities.ev_charge_power": "EV charge flow entity",
          "entities.battery_charge_power": "Battery charge flow entity",
          "entities.battery_discharge_power": "Battery discharge flow entity",
          invert_battery_flow: "Invert battery flow direction",
          primary_font_size: "Primary font size (px) (e.g. 34)",
          secondary_font_size: "Secondary font size (px) (e.g. 28)",
          dynamic_speed_enabled: "Enable dynamic speed based on power",
          min_flow_speed: "Slowest animation speed (seconds)",
          max_flow_speed: "Fastest animation speed (seconds)",
          min_power_threshold: "Power at slowest speed (Watts)",
          max_power_threshold: "Power at fastest speed (Watts)",
          display_unit: "Global display unit (Fallback)",
          decimals_w: "Global decimals for W / Wh / Wp",
          decimals_kw: "Global decimals for kW / kWh / kWp",
          decimals: "Global decimals (Fallback for %, £, V)",
          unit_multiplier: "Global unit multiplier (Fallback)",
          auto_kw_threshold: "Auto convert W to kW if above (e.g. 1000)",
          house_color_dark: "House color in dark mode (hex)",
          roof_color_dark: "Roof color in dark mode (hex)",
          house_color_light: "House color in light mode (hex)",
          roof_color_light: "Roof color in light mode (hex)",
          solar_line_color: "Solar line color",
          grid_import_line_color: "Grid import line color",
          grid_export_line_color: "Grid export line color",
          battery_charge_line_color: "Battery charge line color",
          battery_discharge_line_color: "Battery discharge line color",
          ev_line_color: "EV line color",
        };

        if (staticMap[schema.name]) return staticMap[schema.name];

        if (schema.name.endsWith("_descriptor_enabled")) return "Enable descriptor";
        if (schema.name.endsWith("_descriptor_label")) return "Label";
        
        if (schema.name.endsWith("_tap_entity")) return "More-Info Click Override (Optional)";
        if (schema.name.endsWith("_descriptor_entity")) return "Primary Entity (Power)";
        if (schema.name.endsWith("_display_unit") && !schema.name.includes("_secondary_")) return "Primary Display Unit";
        if (schema.name.endsWith("_unit_multiplier") && !schema.name.includes("_secondary_")) return "Primary Unit Multiplier";

        if (schema.name.endsWith("_secondary_entity")) return "Secondary Entity (e.g., Energy % or £)";
        if (schema.name.endsWith("_secondary_icon")) return "Secondary Icon (Optional)";
        if (schema.name.endsWith("_secondary_display_unit")) return "Secondary Display Unit";
        if (schema.name.endsWith("_secondary_unit_multiplier")) return "Secondary Unit Multiplier";

        return schema.name;
      },
      assertConfig: (config) => {
        if (config && config.entities && typeof config.entities !== "object") {
          throw new Error("entities must be an object with entity ids");
        }
        if (config && config.threshold != null && Number.isNaN(Number(config.threshold))) {
          throw new Error("threshold must be a number (Watts)");
        }
      },
    };
  }

  getColorStyleVars() {
    const colorMap = [
      ["solar_line_color", "--pfc-solar-color"],
      ["grid_import_line_color", "--pfc-grid-import-color"],
      ["grid_export_line_color", "--pfc-grid-export-color"],
      ["battery_charge_line_color", "--pfc-battery-charge-color"],
      ["battery_discharge_line_color", "--pfc-battery-discharge-color"],
      ["ev_line_color", "--pfc-ev-color"],
      ["house_color_dark", "--pfc-house-color-dark"],
      ["roof_color_dark", "--pfc-roof-color-dark"],
      ["house_color_light", "--pfc-house-color-light"],
      ["roof_color_light", "--pfc-roof-color-light"]
    ];

    const styleArray = colorMap
      .map(([configKey, cssVar]) => {
        const value = this.config?.[configKey];
        return value ? `${cssVar}: ${value};` : "";
      })
      .filter(Boolean);

    // Inject variable typography settings into the card container
    const primarySize = this.config?.primary_font_size || 34;
    const secondarySize = this.config?.secondary_font_size || 28;
    
    styleArray.push(`--primary-font-size: ${primarySize}px;`);
    styleArray.push(`--secondary-font-size: ${secondarySize}px;`);

    return styleArray.join(" ");
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      #svg-overlay {
        position: relative;
        width: 100%;
        height: 350px;
        container-type: size;
        pointer-events: none;
        padding: 48px 16px 16px 16px; 
        box-sizing: border-box;
      }
      #svg-overlay > div:not(.descriptor) {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      #svg-container-bg svg {
        opacity: 0.5;
      }
      
      /* Default Dark Mode Styles (Boosted visibility over original SVG) */
      #svg-container-bg #house path { fill: var(--pfc-house-color-dark, #4a5976) !important; }
      #svg-container-bg #roof path { fill: var(--pfc-roof-color-dark, #3b465e) !important; }

      /* Theme Support for Background SVG in Light Mode */
      .theme-light #svg-container-bg svg {
        opacity: 0.8; 
      }
      .theme-light #svg-container-bg #house path { fill: var(--pfc-house-color-light, #dce1e8) !important; }
      .theme-light #svg-container-bg #roof path { fill: var(--pfc-roof-color-light, #c8d0db) !important; }
      .theme-light #svg-container-bg #windows path { fill: #9bc2e6 !important; } 
      .theme-light #svg-container-bg #solar path { fill: #666155 !important; } 
      .theme-light #svg-container-bg #inverter path { fill: #a5b1c2 !important; }
      .theme-light #svg-container-bg #car path { fill: #a5b1c2 !important; }
      .theme-light #svg-container-bg #battery path:nth-child(1) { fill: #a5b1c2 !important; }
      
      .theme-light #svg-container-bg #powerline-solar path,
      .theme-light #svg-container-bg #powerline-outside path,
      .theme-light #svg-container-bg #powerline-grid path:nth-child(3) { 
        stroke: #777777 !important; 
      }
      .theme-light #svg-container-bg #powerline-battery path,
      .theme-light #svg-container-bg #powerline-house path { 
        stroke: #555555 !important; 
      }

      #descriptor-overlay {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .descriptor-line {
        stroke: var(--primary-text-color, #ffffff);
        stroke-width: 2;
        opacity: 0.5;
      }
      
      /* Use fallback to dark text in light mode just in case HA vars fail */
      .theme-light .descriptor-line { stroke: var(--primary-text-color, #000000); }
      .theme-light .descriptor-value,
      .theme-light .descriptor-secondary-value { fill: var(--primary-text-color, #000000); }
      .theme-light .descriptor-label { fill: var(--secondary-text-color, #555555); }

      .descriptor-secondary-value {
        fill: var(--primary-text-color, #ffffff);
        font-size: var(--secondary-font-size, 28px);
        font-weight: 500;
        opacity: 0.9;
      }

      .descriptor-value {
        fill: var(--primary-text-color, #ffffff);
        font-size: var(--primary-font-size, 34px);
        font-weight: bold;
      }

      .descriptor-label {
        fill: var(--secondary-text-color, #9aa0a6);
        font-size: var(--secondary-font-size, 28px);
        font-weight: 500;
      }

      .anim-line {
        stroke-width: 6px;
        stroke-linecap: round;
        filter: url(#glow);
        stroke-dasharray: 100 2000;
        stroke-opacity: 1 !important;
        --animation-duration: 3s;
      }

      .flow-active .anim-line,
      .anim-line.flow-active {
        animation: flow-pulse var(--animation-duration) ease-in-out infinite !important;
      }

      .anim-line.reverse-flow {
        animation-direction: reverse !important;
      }

      .flow-active {
        animation-play-state: running !important;
        opacity: 1 !important;
      }
      
      .flow-off {
        animation-play-state: paused !important;
        opacity: 0 !important;
      }

      @keyframes flow-pulse {
        0% {
          stroke-dashoffset: 2100;
          stroke-opacity: 0.3;
          filter: drop-shadow(0 0 2px currentColor);
        }
        15% {
          stroke-opacity: 1;
          filter: drop-shadow(0 0 8px currentColor);
        }
        85% {
          stroke-opacity: 1;
          filter: drop-shadow(0 0 8px currentColor);
        }
        100% {
          stroke-dashoffset: 0;
          stroke-opacity: 0.3;
          filter: drop-shadow(0 0 2px currentColor);
        }
      }

      .solar { stroke: var(--pfc-solar-color, var(--energy-solar-color, gold)) !important; }
      .grid-import { stroke: var(--pfc-grid-import-color, var(--energy-grid-consumption-color, dodgerblue)) !important; }
      .grid-export { stroke: var(--pfc-grid-export-color, var(--energy-grid-return-color, limegreen)) !important; }
      .bat-charge { stroke: var(--pfc-battery-charge-color, var(--energy-battery-charge-color, cornflowerblue)) !important; }
      .bat-discharge { stroke: var(--pfc-battery-discharge-color, var(--energy-battery-discharge-color, deepskyblue)) !important; }
      .ev { stroke: var(--pfc-ev-color, var(--energy-car-color, deepskyblue)) !important; }
    `;
  }

  getDynamicBatteryIcon(rawIcon, val) {
    if (!rawIcon) return "";
    const lower = rawIcon.toLowerCase();
    
    // Accurate logic maps directly to Material Design battery increments
    if (lower.includes("battery") || lower.includes("bess")) {
      const num = parseFloat(val);
      if (isNaN(num)) return "mdi:battery";
      
      const rounded = Math.round(num / 10) * 10;
      if (rounded === 0) return "mdi:battery-outline";
      if (rounded === 100) return "mdi:battery";
      return `mdi:battery-${rounded}`;
    }
    
    return rawIcon;
  }

  formatValue(stateStr, currentUnit, displayUnitCfg, multiplierCfg, decimalsCfg) {
    let val = parseFloat(stateStr);
    
    const isCurrency = (displayUnitCfg && displayUnitCfg.includes("£")) || (currentUnit && currentUnit.includes("£"));

    if (isNaN(val)) return `${stateStr} ${currentUnit}`.trim();

    let displayUnit = (displayUnitCfg !== undefined && displayUnitCfg !== "") ? displayUnitCfg : 
                      (this.config.display_unit !== undefined && this.config.display_unit !== "") ? this.config.display_unit : (currentUnit || "");

    let multiplier = (multiplierCfg !== undefined && multiplierCfg !== "") ? parseFloat(multiplierCfg) : 
                     (this.config.unit_multiplier !== undefined) ? parseFloat(this.config.unit_multiplier) : 1;

    // Handles W to kW and kW to W reversibly if multiplier not overridden manually (supports Wp and Wh)
    if (displayUnit && multiplier === 1 && multiplierCfg === undefined && this.config.unit_multiplier === undefined) {
      const cUnit = (currentUnit || "").toLowerCase().trim();
      const dUnit = displayUnit.toLowerCase().trim();
      
      if ((cUnit === 'w' && dUnit === 'kw') || (cUnit === 'wh' && dUnit === 'kwh') || (cUnit === 'wp' && dUnit === 'kwp')) multiplier = 0.001;
      else if ((cUnit === 'kw' && dUnit === 'w') || (cUnit === 'kwh' && dUnit === 'wh') || (cUnit === 'kwp' && dUnit === 'wp')) multiplier = 1000;
    }

    val = val * multiplier;

    // Auto kW / kWh threshold handling gracefully accepts W, Wh, Wp, etc.
    const autoKwThreshold = this.config.auto_kw_threshold !== undefined && this.config.auto_kw_threshold !== "" ? parseFloat(this.config.auto_kw_threshold) : null;
    
    if (autoKwThreshold !== null && !isNaN(autoKwThreshold) && Math.abs(val) >= autoKwThreshold) {
      const cleanUnit = displayUnit.trim().toLowerCase();
      // Apply to 'w', 'wh', 'wp' etc. - anything containing w but not kw or mw
      if (cleanUnit.includes('w') && !cleanUnit.includes('kw') && !cleanUnit.includes('mw')) {
        val = val / 1000;
        // Case-preserving replacement for 'W' to 'kW'
        displayUnit = displayUnit.replace(/w/i, match => match === 'W' ? 'kW' : 'kw');
      }
    }

    let decimals = (decimalsCfg !== undefined && decimalsCfg !== "") ? parseInt(decimalsCfg, 10) : undefined;
    
    // Dynamic decimals based on final calculated unit if not specifically overridden per-item
    if (decimals === undefined) {
      const finalUnitLower = (displayUnit || "").toLowerCase().trim();
      if (isCurrency || finalUnitLower.includes('£')) {
        decimals = 2; // Always force 2 decimals for currency
      } else if (finalUnitLower.includes('kw')) {
        decimals = this.config.decimals_kw !== undefined && this.config.decimals_kw !== "" ? parseInt(this.config.decimals_kw, 10) : 2;
      } else if (finalUnitLower.includes('w') && !finalUnitLower.includes('mw')) {
        decimals = this.config.decimals_w !== undefined && this.config.decimals_w !== "" ? parseInt(this.config.decimals_w, 10) : 0;
      } else {
        decimals = this.config.decimals !== undefined && this.config.decimals !== "" ? parseInt(this.config.decimals, 10) : undefined;
      }
    }
    
    let formattedNum = "";
    if (decimals !== undefined && !isNaN(decimals)) {
      const factor = Math.pow(10, decimals);
      val = Math.round(val * factor) / factor;
      formattedNum = val.toFixed(decimals);
    } else {
      formattedNum = (Math.round(val * 100) / 100).toString();
    }

    if (isCurrency || (displayUnit && displayUnit.includes("£"))) {
      let cleanUnit = displayUnit ? displayUnit.replace("£", "").trim() : "";
      return `£${formattedNum}${cleanUnit ? ' ' + cleanUnit : ''}`;
    }

    return `${formattedNum} ${displayUnit || ""}`.trim();
  }

  fireMoreInfo(entityId) {
    if (!entityId) return;
    const event = new Event("hass-more-info", {
      bubbles: true,
      cancelable: false,
      composed: true,
    });
    event.detail = { entityId };
    this.dispatchEvent(event);
  }

  renderDescriptor(type) {
    const enabled = this.config[`${type}_descriptor_enabled`];
    const anchor = this.descriptorAnchors[type];
    if (!enabled || !anchor) return "";

    const label = this.config[`${type}_descriptor_label`] || "";
    
    const primaryEntityId = this.config[`${type}_descriptor_entity`];
    const secondaryEntityId = this.config[`${type}_secondary_entity`];
    
    // Dynamic Typography Integration
    const primaryFontSize = this.config.primary_font_size || 34;
    const secondaryFontSize = this.config.secondary_font_size || 28;
    const iconSize = secondaryFontSize;

    let primaryValue = "";
    if (primaryEntityId && this._hass && this._hass.states[primaryEntityId]) {
      const state = this._hass.states[primaryEntityId];
      const unit = state.attributes.unit_of_measurement || "";
      primaryValue = this.formatValue(
        state.state, 
        unit, 
        this.config[`${type}_display_unit`], 
        this.config[`${type}_unit_multiplier`]
      );
    }

    let secondaryValue = "";
    let rawIconConfig = this.config[`${type}_secondary_icon`];
    let resolvedIcon = "";

    if (secondaryEntityId && this._hass && this._hass.states[secondaryEntityId]) {
      const state = this._hass.states[secondaryEntityId];
      const unit = state.attributes.unit_of_measurement || "";
      
      resolvedIcon = this.getDynamicBatteryIcon(rawIconConfig, state.state);
      
      secondaryValue = this.formatValue(
        state.state, 
        unit, 
        this.config[`${type}_secondary_display_unit`], 
        this.config[`${type}_secondary_unit_multiplier`]
      );
    }

    const rows = [];
    
    if (primaryValue) {
      rows.push({ type: 'text', text: primaryValue, class: "descriptor-value", offset: 0, fontSize: primaryFontSize });
    }
    
    if (secondaryValue) {
      if (resolvedIcon) {
        // Automatically creates gap based on icon size
        const textOffset = iconSize + 6; 
        rows.push({ type: 'icon-text', icon: resolvedIcon, text: secondaryValue, class: "descriptor-secondary-value", offset: textOffset, fontSize: secondaryFontSize });
      } else {
        rows.push({ type: 'text', text: secondaryValue, class: "descriptor-secondary-value", offset: 0, fontSize: secondaryFontSize });
      }
    }
    
    if (label) {
      rows.push({ type: 'text', text: label, class: "descriptor-label", offset: 0, fontSize: secondaryFontSize });
    }

    // Set starting Y appropriately under the top of the line
    let currentY = -5; 
    
    const textNodes = rows.map((row) => {
      let node;
      if (row.type === 'icon-text') {
        const iconY = currentY - (row.fontSize * 0.85); 
        node = svg`
          <!-- Compliant XHTML namespace ensures Home Assistant icons render in SVG -->
          <foreignObject x="${anchor.textX}" y="${iconY}" width="${iconSize}" height="${iconSize}">
            <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
              <ha-icon icon="${row.icon}" style="color: inherit; --mdc-icon-size: ${iconSize}px; width: ${iconSize}px; height: ${iconSize}px; display: block;"></ha-icon>
            </div>
          </foreignObject>
          <text class="${row.class}" x="${anchor.textX + row.offset}" y="${currentY}">${row.text}</text>
        `;
      } else {
        node = svg`<text class="${row.class}" x="${anchor.textX + row.offset}" y="${currentY}">${row.text}</text>`;
      }
      
      // Dynamic math to space the rows identically relative to their font sizes (Line Height = 1.2)
      currentY += (row.fontSize * 1.2); 
      return node;
    });

    // Looks for a custom tap entity first, then falls back to the main power entity
    const tapEntityId = this.config[`${type}_tap_entity`] || primaryEntityId;

    return svg`
      <g class="descriptor descriptor-${type}"
         style="cursor: pointer; pointer-events: auto;"
         @click="${() => this.fireMoreInfo(tapEntityId)}">
        <line class="descriptor-line" x1="${anchor.lineX}" y1="${anchor.lineY1}" x2="${anchor.lineX}" y2="${anchor.lineY2}"></line>
        ${textNodes}
      </g>
    `;
  }

  render() {
    let themeClass = "theme-dark";
    if (this._hass && this._hass.themes) {
      if (this._hass.themes.darkMode === false) {
        themeClass = "theme-light";
      }
    }

    const colorStyle = this.getColorStyleVars();
    return html`
      <ha-card class="${themeClass}" header="${this.config.name || "Power Flow Diagram"}" style="${colorStyle}">
        <div id="svg-overlay">
          <div id="svg-container-bg"></div>
          <div id="svg-container-solar"></div>
          <div id="svg-container-battery"></div>
          <div id="svg-container-ev"></div>
          <div id="svg-container-primary"></div>
          <div id="svg-container-out"></div>
          <svg id="descriptor-overlay" viewBox="0 0 1139 756" preserveAspectRatio="xMidYMid meet" style="overflow: visible;">
            ${this.renderDescriptor("solar")}
            ${this.renderDescriptor("grid")}
            ${this.renderDescriptor("battery")}
            ${this.renderDescriptor("ev")}
            ${this.renderDescriptor("home")}
          </svg>
        </div>
      </ha-card>
    `;
  }
}

customElements.define("power-flow-card", PowerFlowCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "power-flow-card",
  name: "Power Flow Card",
  preview: true,
  description: "Power Flow visualisation card for Home Assistant Lovelace",
});
