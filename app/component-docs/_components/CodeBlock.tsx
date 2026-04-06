"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

type Token = { type: "keyword" | "string" | "comment" | "tag" | "prop" | "number" | "plain"; value: string }

/**
 * Single-pass tokenizer — avoids regex-on-regex corruption.
 * Processes the source string from left to right, picking the longest match.
 */
function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  const KEYWORDS = new Set([
    "import", "export", "from", "default", "function", "const", "let", "var",
    "return", "if", "else", "for", "while", "class", "extends", "interface",
    "type", "async", "await", "new", "typeof", "void", "null", "undefined",
    "true", "false", "as", "of", "in", "break", "continue", "switch", "case",
  ])

  function peek(offset = 0) { return code[i + offset] }
  function rest() { return code.slice(i) }
  function isWordChar(ch: string) { return /\w/.test(ch) }

  while (i < code.length) {
    const ch = code[i]

    // ── Line comment
    if (ch === "/" && peek(1) === "/") {
      const end = code.indexOf("\n", i)
      const val = end === -1 ? code.slice(i) : code.slice(i, end)
      tokens.push({ type: "comment", value: val })
      i += val.length
      continue
    }

    // ── Block comment
    if (ch === "/" && peek(1) === "*") {
      const end = code.indexOf("*/", i + 2)
      const val = end === -1 ? code.slice(i) : code.slice(i, end + 2)
      tokens.push({ type: "comment", value: val })
      i += val.length
      continue
    }

    // ── Template literal
    if (ch === "`") {
      let j = i + 1
      while (j < code.length && code[j] !== "`") {
        if (code[j] === "\\" ) j++ // skip escape
        j++
      }
      tokens.push({ type: "string", value: code.slice(i, j + 1) })
      i = j + 1
      continue
    }

    // ── String (single or double quote)
    if (ch === '"' || ch === "'") {
      let j = i + 1
      while (j < code.length && code[j] !== ch) {
        if (code[j] === "\\") j++
        j++
      }
      tokens.push({ type: "string", value: code.slice(i, j + 1) })
      i = j + 1
      continue
    }

    // ── JSX/HTML opening/closing tag name: <Foo  </Foo  />
    if (ch === "<" && (peek(1) === "/" || /[A-Za-z]/.test(peek(1) ?? ""))) {
      // Emit '<' or '</' as a plain token first
      const slash = peek(1) === "/" ? 1 : 0
      tokens.push({ type: "plain", value: code.slice(i, i + 1 + slash) })
      i += 1 + slash
      // Read tag name
      let j = i
      while (j < code.length && isWordChar(code[j])) j++
      if (j > i) {
        tokens.push({ type: "tag", value: code.slice(i, j) })
        i = j
      }
      continue
    }

    // ── Numbers
    if (/\d/.test(ch) && (i === 0 || !isWordChar(code[i - 1]))) {
      let j = i
      while (j < code.length && /[\d.]/.test(code[j])) j++
      tokens.push({ type: "number", value: code.slice(i, j) })
      i = j
      continue
    }

    // ── Identifiers / keywords
    if (/[a-zA-Z_$]/.test(ch)) {
      let j = i
      while (j < code.length && isWordChar(code[j])) j++
      const word = code.slice(i, j)

      // Check if this word is a JSX prop (followed by =)
      // Only color as prop if not a keyword
      if (!KEYWORDS.has(word) && code[j] === "=" && code[j + 1] !== "=") {
        tokens.push({ type: "prop", value: word })
      } else if (KEYWORDS.has(word)) {
        tokens.push({ type: "keyword", value: word })
      } else {
        tokens.push({ type: "plain", value: word })
      }
      i = j
      continue
    }

    // ── Default: emit character as plain
    tokens.push({ type: "plain", value: ch })
    i++
  }

  return tokens
}

const TOKEN_CLASSES: Record<Token["type"], string> = {
  keyword: "text-blue-11",
  string:  "text-green-11",
  comment: "text-text-disabled italic",
  tag:     "text-yellow-11",
  prop:    "text-blue-10",
  number:  "text-yellow-10",
  plain:   "",
}

export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const tokens = React.useMemo(() => tokenize(code), [code])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const ta = document.createElement("textarea")
      ta.value = code
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("relative rounded-xl border border-stroke-primary overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-16 py-10 bg-surface-secondary border-b border-stroke-primary">
        <span className="text-xs font-medium text-text-disabled uppercase tracking-widest font-code">
          {language}
        </span>
        <Button
          variant="ghost"
          color="neutral"
          size="sm"
          onClick={handleCopy}
          leadingIcon={
            copied
              ? <Check size={12} className="text-green-11" />
              : <Copy size={12} />
          }
          className={cn("transition-all", copied && "text-green-11")}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto bg-surface-bg">
        <pre className="p-20 text-sm leading-relaxed font-code min-w-0" style={{ tabSize: 2 }}>
          <code>
            {tokens.map((tok, idx) => {
              const cls = TOKEN_CLASSES[tok.type]
              return cls
                ? <span key={idx} className={cls}>{tok.value}</span>
                : tok.value
            })}
          </code>
        </pre>
      </div>
    </div>
  )
}
