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
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtjdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGNsaXBQYXRo id5JfGNsaXAxIj4KICAgICAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIi/>CjAgICAgICAgPC9jbGlwUGF0aD4KICAgICAgICA8ZyBjbGlwLXBhdGg9InVybCgjX2NsaXAxKSI+CiAgICAgICAgICAgIDxnIGlkPSJwb3dlcmxpbmUtZ3JpZCIgc2VyaWY6aWQ9InBvd2VybGluZSBncmlkIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjA3NDc2NiwwLDAsMi4wOTU1MTEsMCwtNDIuMDc1ODY0KSI+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDM3Ni45NDc5LDQ0MS40ODk2KSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsMkwzLjAxMiwwTAswWiIgc3R5bGU9ImZpbGw6d2hpdGU7ZmlsbC1ydWxlOm5vbnplcm87Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgtMSwwLDAsMSwzNzYuOTQ3OCw0NDEuNDg5MykiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0tMy4wMTIsMEwwLDAiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxcHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDM3OC42MjA5LDU3MC42NjUzKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsLTEyOS4xNzZDMCwtMTI5LjE3NiAwLjQzOCwtMTEwLjUyMiAtMC4xNjcsLTEwMS4zNjRDLTAuNjE3LC05NC41NTggNi4yMjYsLTkyLjExMSA5LjAzNSwtODkuNzZDMTUuNjI0LC04NC4yNDggNTAuNjU2LC03MC43NzYgNTAuNjU2LC03MC43NzZDNTAuNjU2LC03MC43NzYgNjUuMTUxLC02NS4xMjkgNTUuMzYyLC02Mi44N0M0NS41NzQsLTYwLjYxMSAtMjg1LjYyNSwwIC0yODUuNjI1LDAiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxMjcsMTI3LDEyNyk7c3Ryb2tlLXdpZHRoOjVweDsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==", // grid_line.svg
      out: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGNsaXBQYXRo id5JfGNsaXAxIj4KICAgICAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIi/>Cj0gICAgICAgPC9jbGlwUGF0aD4KICAgICAgICA8ZyBjbGlwLXBhdGg9InVybCgjX2NsaXAxKSI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEuMDc0NzY2LDAsMCwyLjA5NTUxMSw0MTMuMDIzNjc1LDYxNC4zNTgwNTgpIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJwb3dlcmxpbmUtb3V0c2lkZSIgc2VyaWY6aWQ9InBvd2VybGluZSBvdXRzaWRlIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMiwtNzEuMjMxTDE3Ljg4LC03NC40NDVDMTcuODgsLTc0LjQ0NSAyMi45NjIsLTczLjUwNCAyMy4yNDQsLTY3LjE5OEMyMy41McstNjAuODkzIDI0LjcwOSwtMjUuMDAyIDI0LjcwOSwtMjUuMDAyQzI0LjcwOSwtMjUuMDAyIDI2LjkxNSwtMjEuMDgxIDMwLjMwMywtMTkuNjY5QzMyLjI5MiwtMTguODQgNTAuNTM1LC0xMS4wMDQgNjUuMjYsLTQuNjc0QzcxLjE0LC0yLjE0NyA3Ni40NiwwLjE0MSA3OS45NTksMS42NDZDODIuNzUzLDIuODQ3IDg1LjgyOCwzLjIxNCA4OC44MjcsMi43MDdMMTc3LjcwOCwtMTIuMzI4IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpyZ2IoMTI3LDEyNywxMjcpO3N0cm9rZS13aWR0aDo1cHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=", // grid_out.svg
      solar:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRFLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4wMDI0MzksLTIuMDk1NTA1LC0xLjA3NDc2MywtMC4wMDQ3NTYsNDQyLjg5NzM1OSwyOTIuMDEwNzU2KSI+CiAgICAgICAgICAgIDxnIGlkPSJwb3dlcmxpbmUtc29sYXIiIHNlcmlmOmlkPSJwb3dlcmxpbmUgc29sYXIiPgogICAgICAgI...=", // solar_line.svg
      battery:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRFLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoLTEuMDU3NzI3LDAuMzcxNjUzLDAuMTkwNjE3LDIuMDYyMjksMzc1LjAyMjUzOCw0ODIuMjkzMDQpIj4KICAgICAgICAgICAgPGcgaWQ9InBvd2VybGluZS1iYXR0ZXJ5IiBzZXJpZjppZD0icG93ZXJsaW5lIGJhdHRlcnkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTS0yMy42NSwtMi4xMTRMMC4xODksLTIuMTE0IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpyZ2IoMTI3LDEyNywxMjcpO3N0cm9rZS13aWR0aDo1cHg7Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=",
      ev: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRFLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4wNzQ3NjYsMCwwLDIuMDk1NTExLDM0Ny44Nzc2MDcsNDkwLjY3MjgzOCkiPgogICAgICAgICAgICA8ZyBpZD0icG93ZXJsaW5lLWhvdXNlIiBzZXJpZjppZD0icG93ZXJsaW5lIGhvdXNlIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLC0xLjMwNEwtMzAuMjEyLDUuNDcyTC02NS41MDYsLTYuNzc2TC04Mi4xOTQsLTYuMDEiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxMjcsMTI3LDEyNyk7c3Ryb2tlLXdpZHRoOjVweDsiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==",
      bg: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRFLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyMzc1IDE1ODQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1taXRlcmxpbWl0OjEwOyI+PHJlY3QgaWQ9IlNlaXRlLTIiIHNlcmlmOmlkPSJTZWl0ZSAyIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjM3NSIgaGVpZ2h0PSIxNTgzLjMzMyIgc3R5bGU9ImZpbGw6bm9uZTsiLz48Y2xpcFBhdGggaWQ9Il9jbGlwMSI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIzNzUiIGhlaWdodD0iMTU4My4zMzMiLz48L2NsaXBQYXRoPjxnIGNsaXAtcGF0aD0idXJsKCNfY2xpcDEpIj48ZyBpZD0iTGF5ZXItMSIgc2VyaWY6aWQ9IkxheWVyIDEiPjwvZz48ZyBpZD0iaG91c2UiPjxwYXRoIGQ9Ik0xMDQwLjQyMiwxMTEzLjczOWwxOTcuNjQ2LDgyLjM1NGw5MDUuODgzLC0xNTIuOTQybDAsLTQ0MS4yMTJsLTQwMi4zNTQsLTI2OS4zNzVsLTUwMy41MjksNDQyLjM1NGwtMjA5LjU5MiwtODcuNTY3bC00NjguMDU0LDk0LjYyNWwtMzUyLjA4NywtMTQ1Ljg4M2wwLDM5Ny42NDZsMjkwLjkxMiwxMzEuNzY3YzAsMCAxMDUuODgzLDU4LjgyMSAxMDguMjMzLDcuMDU4YzIuMzU0LC01MS43NjcgLTIuMzUsLTM0OC4yMzcgLTIuMzUsLTM0OC4yMzdsNDAyLjM1LC03NC45MjFsLTIuMzU0LDM2NC4zMzNsMzUuMjk2LDBaIiBzdHlsZT0iZmlsbDojMjAyNzMzO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMDBmZmZmOyIvPjwvZz48ZyBpZD0icm9vZiI+...",
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

    // Shifted lineY1 higher to -38 to lengthen the white line further off the image
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

  updateFlow() {
    const threshold = (this.config && this.config.threshold != null)
      ? (Number(this.config.threshold) || 10)
      : 10;
    this.lineConfig
      .filter((c) => c.entity_key)
      .forEach((cfg) => {
        const container = this.lineContainers[cfg.container || cfg.id];

        if (!container) return;

        let value = 0;
        let reverse = !!cfg.reverse;

        if (cfg.type === "bat-charge") {
          const chargeEntity = this.config.entities["battery_charge_power"];
          const dischargeEntity = this.config.entities["battery_discharge_power"];

          const chargeState = chargeEntity ? this._hass.states[chargeEntity] : null;
          const dischargeState = dischargeEntity ? this._hass.states[dischargeEntity] : null;

          const chargeValue = chargeState ? parseFloat(chargeState.state) : 0;
          const dischargeValue = dischargeState ? parseFloat(dischargeState.state) : 0;

          if (chargeValue > 0) {
            value = chargeValue;
            reverse = false;
          } else if (dischargeValue > 0) {
            value = dischargeValue;
            reverse = true;
          } else {
            value = 0;
          }
        } else {
          const entityId = this.config.entities[cfg.entity_key];
          const stateObj = entityId ? this._hass.states[entityId] : null;
          value = stateObj ? parseFloat(stateObj.state) : 0;
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
        { name: `${prefix}_descriptor_entity`, selector: { entity: {} } },
        { name: `${prefix}_decimals`, type: "integer" },
        { name: `${prefix}_display_unit`, selector: { text: {} } },
        { name: `${prefix}_unit_multiplier`, type: "float" },
        
        // Secondary
        { name: `${prefix}_secondary_entity`, selector: { entity: {} } },
        { name: `${prefix}_secondary_icon`, selector: { icon: {} } },
        { name: `${prefix}_secondary_decimals`, type: "integer" },
        { name: `${prefix}_secondary_display_unit`, selector: { text: {} } },
        { name: `${prefix}_secondary_unit_multiplier`, type: "float" },
      ],
    });

    return {
      schema: [
        { name: "name", selector: { text: {} } },
        { name: "threshold", type: "float" },
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
            { name: "decimals", type: "integer" },
            { name: "unit_multiplier", type: "float" },
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
          dynamic_speed_enabled: "Enable dynamic speed based on power",
          min_flow_speed: "Slowest animation speed (seconds)",
          max_flow_speed: "Fastest animation speed (seconds)",
          min_power_threshold: "Power at slowest speed (Watts)",
          max_power_threshold: "Power at fastest speed (Watts)",
          display_unit: "Global display unit (Fallback)",
          decimals: "Global decimal places (Fallback)",
          unit_multiplier: "Global unit multiplier (Fallback)",
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
        
        if (schema.name.endsWith("_descriptor_entity")) return "Primary Entity (Power)";
        if (schema.name.endsWith("_decimals") && !schema.name.includes("_secondary_")) return "Primary Decimals";
        if (schema.name.endsWith("_display_unit") && !schema.name.includes("_secondary_")) return "Primary Display Unit";
        if (schema.name.endsWith("_unit_multiplier") && !schema.name.includes("_secondary_")) return "Primary Unit Multiplier";

        if (schema.name.endsWith("_secondary_entity")) return "Secondary Entity (e.g., Energy % or £)";
        if (schema.name.endsWith("_secondary_icon")) return "Secondary Icon (Optional)";
        if (schema.name.endsWith("_secondary_decimals")) return "Secondary Decimals";
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
    ];

    return colorMap
      .map(([configKey, cssVar]) => {
        const value = this.config?.[configKey];
        return value ? `${cssVar}: ${value};` : "";
      })
      .filter(Boolean)
      .join(" ");
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
        /* Padding increased to accommodate higher positioned text elements and lines */
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
      
      .descriptor-secondary-value {
        fill: var(--primary-text-color, #ffffff);
        font-size: 24px;
        font-weight: 500;
        opacity: 0.9;
      }

      .descriptor-value {
        fill: var(--primary-text-color, #ffffff);
        font-size: 30px;
        font-weight: bold;
      }

      .descriptor-label {
        fill: var(--secondary-text-color, #9aa0a6);
        font-size: 24px;
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

      .solar {
        stroke: var(--pfc-solar-color, var(--energy-solar-color, gold)) !important;
      }
      
      .grid-import {
        stroke: var(--pfc-grid-import-color, var(--energy-grid-consumption-color, dodgerblue)) !important;
      }
      
      .grid-export {
        stroke: var(--pfc-grid-export-color, var(--energy-grid-return-color, limegreen)) !important;
      }
      
      .bat-charge {
        stroke: var(--pfc-battery-charge-color, var(--energy-battery-charge-color, cornflowerblue)) !important;
      }
      
      .bat-discharge {
         stroke: var(--pfc-battery-discharge-color, var(--energy-battery-discharge-color, deepskyblue)) !important;
      }

      .ev {
        stroke: var(--pfc-ev-color, var(--energy-car-color, deepskyblue)) !important;
      }
    `;
  }

  // Resolves the correct material design icon name dynamically if battery/bess is selected
  getDynamicBatteryIcon(rawIcon, val) {
    if (!rawIcon) return "";
    const lower = rawIcon.toLowerCase();
    if (lower.includes("battery") || lower.includes("bess")) {
      const num = parseFloat(val);
      if (isNaN(num)) return "mdi:battery";
      if (num <= 10) return "mdi:battery-alert";
      if (num <= 25) return "mdi:battery-20";
      if (num <= 50) return "mdi:battery-50";
      if (num <= 75) return "mdi:battery-80";
      if (num <= 95) return "mdi:battery-95";
      return "mdi:battery";
    }
    return rawIcon;
  }

  formatValue(stateStr, currentUnit, displayUnitCfg, multiplierCfg, decimalsCfg) {
    let val = parseFloat(stateStr);
    
    // Check if the input represents currency (contains £)
    const isCurrency = (displayUnitCfg && displayUnitCfg.includes("£")) || (currentUnit && currentUnit.includes("£"));

    if (isNaN(val)) return `${stateStr} ${currentUnit}`.trim();

    let displayUnit = (displayUnitCfg !== undefined && displayUnitCfg !== "") ? displayUnitCfg : 
                      (this.config.display_unit !== undefined && this.config.display_unit !== "") ? this.config.display_unit : currentUnit;

    let multiplier = (multiplierCfg !== undefined && multiplierCfg !== "") ? parseFloat(multiplierCfg) : 
                     (this.config.unit_multiplier !== undefined) ? parseFloat(this.config.unit_multiplier) : 1;

    if (displayUnit && multiplier === 1 && multiplierCfg === undefined && this.config.unit_multiplier === undefined) {
      if (currentUnit.toLowerCase() === 'w' && displayUnit.toLowerCase() === 'kw') {
        multiplier = 0.001;
      } else if (currentUnit.toLowerCase() === 'wh' && displayUnit.toLowerCase() === 'kwh') {
        multiplier = 0.001;
      }
    }

    val = val * multiplier;

    let decimals = (decimalsCfg !== undefined && decimalsCfg !== "") ? parseInt(decimalsCfg, 10) : 
                   (this.config.decimals !== undefined && this.config.decimals !== "") ? parseInt(this.config.decimals, 10) : undefined;
    
    let formattedNum = "";
    if (decimals !== undefined && !isNaN(decimals)) {
      const factor = Math.pow(10, decimals);
      val = Math.round(val * factor) / factor;
      formattedNum = val.toFixed(decimals);
    } else {
      formattedNum = (Math.round(val * 100) / 100).toString();
    }

    // Position currency symbol as a prefix if it's £
    if (isCurrency || (displayUnit && displayUnit.trim() === "£")) {
      return `£${formattedNum}`;
    }

    return `${formattedNum} ${displayUnit || ""}`.trim();
  }

  renderDescriptor(type) {
    const enabled = this.config[`${type}_descriptor_enabled`];
    const anchor = this.descriptorAnchors[type];
    if (!enabled || !anchor) return "";

    const label = this.config[`${type}_descriptor_label`] || "";
    
    const primaryEntityId = this.config[`${type}_descriptor_entity`];
    const secondaryEntityId = this.config[`${type}_secondary_entity`];

    let primaryValue = "";
    if (primaryEntityId && this._hass && this._hass.states[primaryEntityId]) {
      const state = this._hass.states[primaryEntityId];
      const unit = state.attributes.unit_of_measurement || "";
      primaryValue = this.formatValue(
        state.state, 
        unit, 
        this.config[`${type}_display_unit`], 
        this.config[`${type}_unit_multiplier`], 
        this.config[`${type}_decimals`]
      );
    }

    let secondaryValue = "";
    let secondaryDisplayStr = "";
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
        this.config[`${type}_secondary_unit_multiplier`], 
        this.config[`${type}_secondary_decimals`]
      );

      // Prepend icon if selected
      if (resolvedIcon) {
        secondaryDisplayStr = `${resolvedIcon} ${secondaryValue}`;
      } else {
        secondaryDisplayStr = secondaryValue;
      }
    }

    // Build ordered row elements ensuring no blank gaps are left if data is missing
    const rows = [];
    
    if (primaryValue) {
      rows.push({ text: primaryValue, class: "descriptor-value" });
    }
    
    if (secondaryDisplayStr) {
      rows.push({ text: secondaryDisplayStr, class: "descriptor-secondary-value" });
    }
    
    if (label) {
      rows.push({ text: label, class: "descriptor-label" });
    }

    let currentY = -6; // Initial row height starting coordinate
    const textNodes = rows.map(row => {
      const node = svg`<text class="${row.class}" x="${anchor.textX}" y="${currentY}">${row.text}</text>`;
      currentY += 28; // Spacing step between rows
      return node;
    });

    return svg`
      <g class="descriptor descriptor-${type}">
        <line class="descriptor-line" x1="${anchor.lineX}" y1="${anchor.lineY1}" x2="${anchor.lineX}" y2="${anchor.lineY2}"></line>
        ${textNodes}
      </g>
    `;
  }

  render() {
    const colorStyle = this.getColorStyleVars();
    return html`
      <ha-card header="${this.config.name || "Power Flow Diagram"}" style="${colorStyle}">
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

