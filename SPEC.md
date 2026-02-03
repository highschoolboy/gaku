# Portfolio Site 改修仕様（Antigravity用）

## 0. 前提
- 静的サイト（HTML/CSS/JSのみ）
- ホスティング：GitHub Pages（Project Pages）  
  → 公開URLは `https://<username>.github.io/gaku/` の想定（サブパス配下で動く必要あり）
- 画像：Cloudflare（R2等の外部URL参照）に置く前提
- 動画：YouTube参照（埋め込み or リンク）
- リポジトリに大容量の画像・動画を入れない（assetsは最小限）

## 1. 現状のセクションID（既存）
既存HTMLに以下のIDが存在するため、ナビ等は必ずこのIDに合わせる：
- `#info`（プロフィール）
- `#highlights`（強みとスキル）
- `#journey`（これまでの歩み）
- `#career`（職歴）
- `#licenses`（資格・目標）
- `#media`（メディア：現状は寿司打）

追加で `#contact` を新設する。

## 2. 必須修正（GitHub Pages 404/参照ずれ防止）
### 2.1 faviconのパスを相対にする（重要）
現状 `index.html` のfavicon参照が `/assets/...` になっているため、`/ig/` 配下で参照が切れる。
以下を **すべて相対パス**に変更する：
- `/assets/favicon/...` → `assets/favicon/...`

※ `styles.css` は相対参照になっていればOK。

## 3. ナビゲーション追加
### 3.1 PC
- 画面上部に固定ヘッダー（sticky）
- ナビ項目：
  - プロフィール → `#info`
  - 強み → `#highlights`
  - 歩み → `#journey`
  - 職歴 → `#career`
  - 資格 → `#licenses`
  - メディア → `#media`
  - 連絡 → `#contact`

### 3.2 モバイル
- ハンバーガーメニュー
- 開閉要件：
  - 背景クリックで閉じる
  - Escで閉じる
  - リンククリックで閉じる
  - `aria-*` 付与（最低限）

### 3.3 追加品質（任意だが推奨）
- 現在セクションに応じてナビをアクティブ表示（IntersectionObserver）

## 4. Contact セクション新設（#contact）
- 連絡手段を集約
- まずはプレースホルダーでOK
  - メール：`mailto:xxxx@example.com`（あとで差し替え）
  - SNS：無ければ非表示でOK
- 「個人情報を出しすぎない」設計（住所等は載せない）

## 5. メディア運用（画像はCloudflare、動画はYouTube）
### 5.1 現状の問題
- `assets/videos/*.mp4` のような動画同梱は、リポジトリが重くなり運用が破綻しやすい。

### 5.2 対応方針
- `#media` 内の動画は YouTube 参照に変更（埋め込み or 外部リンク）
- 画像もCloudflareのURLへ差し替え可能な構造にする（後でURLを差し替えるだけ）

## 6. ギャラリー追加（部屋写真など）— gallery.json運用
### 6.1 目的
- 画像をリポジトリに入れず、Cloudflare上のURLに差し替えるだけで増やせるようにする。

### 6.2 追加ファイル
- `gallery.json` を新規作成（#media内で読み込んで表示）

### 6.3 gallery.jsonスキーマ（例）
```json
[
  {
    "type": "image",
    "title": "部屋の写真 1",
    "caption": "説明（任意）",
    "thumbUrl": "https://example.com/room/001-thumb.webp",
    "fullUrl": "https://example.com/room/001-large.webp"
  },
  {
    "type": "youtube",
    "title": "紹介動画",
    "caption": "説明（任意）",
    "youtubeId": "dQw4w9WgXcQ"
  }
]
