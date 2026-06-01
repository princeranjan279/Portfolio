import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Play, RotateCcw, Copy, Download, Terminal, Code2,
  ChevronDown, CheckCircle, AlertCircle, Loader,
  Maximize2, Minimize2, BookOpen, Zap,
} from 'lucide-react';
import './Compiler.css';

// ── Language config ────────────────────────────────────────────────────────
interface LangConfig {
  id: string;
  label: string;
  /** Exact compiler name accepted by wandbox.org/api/compile.json */
  compiler: string;
  /** Optional Wandbox compiler option string */
  compilerOptions?: string;
  extension: string;
  color: string;
  icon: string;
  defaultCode: string;
}

const LANGUAGES: LangConfig[] = [
  // ── Python ──────────────────────────────────────────────────────────────
  {
    id: 'python',
    label: 'Python',
    compiler: 'cpython-head',
    extension: 'py',
    color: '#3b82f6',
    icon: '🐍',
    defaultCode: [
      '# Python — Online Compiler',
      '',
      'def fibonacci(n):',
      '    a, b = 0, 1',
      '    result = []',
      '    for _ in range(n):',
      '        result.append(a)',
      '        a, b = b, a + b',
      '    return result',
      '',
      'def greet(name):',
      '    print(f"Hello, {name}! 👋")',
      '    print("Welcome to the Online Compiler!")',
      '',
      'greet("Developer")',
      'print()',
      'print("Fibonacci(10):", fibonacci(10))',
    ].join('\n'),
  },

  // ── JavaScript ──────────────────────────────────────────────────────────
  {
    id: 'javascript',
    label: 'JavaScript',
    compiler: 'nodejs-20.17.0',
    extension: 'js',
    color: '#f59e0b',
    icon: '🟨',
    defaultCode: [
      '// JavaScript — Online Compiler',
      '',
      'function fibonacci(n) {',
      '  const seq = [0, 1];',
      '  for (let i = 2; i < n; i++) seq[i] = seq[i-1] + seq[i-2];',
      '  return seq.slice(0, n);',
      '}',
      '',
      'function greet(name) {',
      '  console.log(`Hello, ${name}! 👋`);',
      '  console.log("Welcome to the Online Compiler!");',
      '}',
      '',
      'greet("Developer");',
      'console.log();',
      'console.log("Fibonacci(10):", fibonacci(10).join(", "));',
    ].join('\n'),
  },

  // ── TypeScript ──────────────────────────────────────────────────────────
  {
    id: 'typescript',
    label: 'TypeScript',
    compiler: 'typescript-5.6.2',
    extension: 'ts',
    color: '#6366f1',
    icon: '🔷',
    defaultCode: [
      '// TypeScript — Online Compiler',
      '',
      'interface Person { name: string; age: number; role: string; }',
      '',
      'function greet(p: Person): string {',
      '  return `Hello, ${p.name}! Age: ${p.age}, Role: ${p.role}`;',
      '}',
      '',
      'function fibonacci(n: number): number[] {',
      '  const seq: number[] = [0, 1];',
      '  for (let i = 2; i < n; i++) seq[i] = seq[i-1] + seq[i-2];',
      '  return seq.slice(0, n);',
      '}',
      '',
      'const dev: Person = { name: "Developer", age: 25, role: "Full Stack" };',
      'console.log(greet(dev));',
      'console.log("Fibonacci(10):", fibonacci(10).join(", "));',
    ].join('\n'),
  },

  // ── Java ────────────────────────────────────────────────────────────────
  {
    id: 'java',
    label: 'Java',
    compiler: 'openjdk-jdk-22+36',
    extension: 'java',
    color: '#ef4444',
    icon: '☕',
    defaultCode: [
      '// Java — Online Compiler',
      'import java.util.*;',
      '',
      'public class Main {',
      '    static List<Integer> fibonacci(int n) {',
      '        List<Integer> seq = new ArrayList<>(Arrays.asList(0, 1));',
      '        for (int i = 2; i < n; i++)',
      '            seq.add(seq.get(i-1) + seq.get(i-2));',
      '        return seq.subList(0, n);',
      '    }',
      '',
      '    static void greet(String name) {',
      '        System.out.println("Hello, " + name + "! 👋");',
      '        System.out.println("Welcome to the Online Compiler!");',
      '    }',
      '',
      '    public static void main(String[] args) {',
      '        greet("Developer");',
      '        System.out.println();',
      '        System.out.println("Fibonacci(10): " + fibonacci(10));',
      '    }',
      '}',
    ].join('\n'),
  },

  // ── C++ ─────────────────────────────────────────────────────────────────
  {
    id: 'cpp',
    label: 'C++',
    compiler: 'gcc-head',
    compilerOptions: 'warning,c++17',
    extension: 'cpp',
    color: '#06b6d4',
    icon: '⚡',
    defaultCode: [
      '// C++ — Online Compiler',
      '#include <iostream>',
      '#include <vector>',
      '#include <string>',
      'using namespace std;',
      '',
      'vector<int> fibonacci(int n) {',
      '    vector<int> seq = {0, 1};',
      '    for (int i = 2; i < n; i++)',
      '        seq.push_back(seq[i-1] + seq[i-2]);',
      '    seq.resize(n);',
      '    return seq;',
      '}',
      '',
      'void greet(const string& name) {',
      '    cout << "Hello, " << name << "! 👋" << endl;',
      '    cout << "Welcome to the Online Compiler!" << endl;',
      '}',
      '',
      'int main() {',
      '    greet("Developer");',
      '    cout << endl;',
      '    auto fib = fibonacci(10);',
      '    cout << "Fibonacci(10): ";',
      '    for (int i = 0; i < (int)fib.size(); i++)',
      '        cout << fib[i] << (i+1 < (int)fib.size() ? ", " : "\\n");',
      '    return 0;',
      '}',
    ].join('\n'),
  },

  // ── C ───────────────────────────────────────────────────────────────────
  {
    id: 'c',
    label: 'C',
    compiler: 'gcc-head-c',
    compilerOptions: 'warning',
    extension: 'c',
    color: '#10b981',
    icon: '🔧',
    defaultCode: [
      '// C — Online Compiler',
      '#include <stdio.h>',
      '',
      'void fibonacci(int n, int seq[]) {',
      '    seq[0] = 0;',
      '    if (n > 1) seq[1] = 1;',
      '    for (int i = 2; i < n; i++)',
      '        seq[i] = seq[i-1] + seq[i-2];',
      '}',
      '',
      'void greet(const char* name) {',
      '    printf("Hello, %s! 👋\\n", name);',
      '    printf("Welcome to the Online Compiler!\\n");',
      '}',
      '',
      'int main() {',
      '    greet("Developer");',
      '    printf("\\n");',
      '    int fib[10];',
      '    fibonacci(10, fib);',
      '    printf("Fibonacci(10): ");',
      '    for (int i = 0; i < 10; i++)',
      '        printf("%d%s", fib[i], i < 9 ? ", " : "\\n");',
      '    return 0;',
      '}',
    ].join('\n'),
  },

  // ── Go ──────────────────────────────────────────────────────────────────
  {
    id: 'go',
    label: 'Go',
    compiler: 'go-1.23.2',
    extension: 'go',
    color: '#06b6d4',
    icon: '🐹',
    defaultCode: [
      '// Go — Online Compiler',
      'package main',
      '',
      'import "fmt"',
      '',
      'func fibonacci(n int) []int {',
      '\tseq := make([]int, n)',
      '\tif n > 0 { seq[0] = 0 }',
      '\tif n > 1 { seq[1] = 1 }',
      '\tfor i := 2; i < n; i++ { seq[i] = seq[i-1] + seq[i-2] }',
      '\treturn seq',
      '}',
      '',
      'func greet(name string) {',
      '\tfmt.Printf("Hello, %s! 👋\\n", name)',
      '\tfmt.Println("Welcome to the Online Compiler!")',
      '}',
      '',
      'func main() {',
      '\tgreet("Developer")',
      '\tfmt.Println()',
      '\tfmt.Printf("Fibonacci(10): %v\\n", fibonacci(10))',
      '}',
    ].join('\n'),
  },

  // ── Rust ────────────────────────────────────────────────────────────────
  {
    id: 'rust',
    label: 'Rust',
    compiler: 'rust-1.82.0',
    extension: 'rs',
    color: '#f97316',
    icon: '🦀',
    defaultCode: [
      '// Rust — Online Compiler',
      'fn fibonacci(n: usize) -> Vec<u64> {',
      '    if n == 0 { return vec![]; }',
      '    let mut seq = vec![0u64, 1];',
      '    for i in 2..n {',
      '        let next = seq[i-1] + seq[i-2];',
      '        seq.push(next);',
      '    }',
      '    seq[..n].to_vec()',
      '}',
      '',
      'fn greet(name: &str) {',
      '    println!("Hello, {}! 👋", name);',
      '    println!("Welcome to the Online Compiler!");',
      '}',
      '',
      'fn main() {',
      '    greet("Developer");',
      '    println!();',
      '    let fib: Vec<String> = fibonacci(10).iter().map(|n| n.to_string()).collect();',
      '    println!("Fibonacci(10): {}", fib.join(", "));',
      '}',
    ].join('\n'),
  },

  // ── PHP ─────────────────────────────────────────────────────────────────
  {
    id: 'php',
    label: 'PHP',
    compiler: 'php-8.3.12',
    extension: 'php',
    color: '#818cf8',
    icon: '🐘',
    defaultCode: [
      '<?php',
      '// PHP — Online Compiler',
      '',
      'function fibonacci(int $n): array {',
      '    $seq = [0, 1];',
      '    for ($i = 2; $i < $n; $i++)',
      '        $seq[$i] = $seq[$i-1] + $seq[$i-2];',
      '    return array_slice($seq, 0, $n);',
      '}',
      '',
      'function greet(string $name): void {',
      '    echo "Hello, $name! 👋\\n";',
      '    echo "Welcome to the Online Compiler!\\n";',
      '}',
      '',
      'greet("Developer");',
      'echo "\\n";',
      '$fib = fibonacci(10);',
      'echo "Fibonacci(10): " . implode(", ", $fib) . "\\n";',
    ].join('\n'),
  },

  // ── Ruby ────────────────────────────────────────────────────────────────
  {
    id: 'ruby',
    label: 'Ruby',
    compiler: 'ruby-3.4.9',
    extension: 'rb',
    color: '#ef4444',
    icon: '💎',
    defaultCode: [
      '# Ruby — Online Compiler',
      '',
      'def fibonacci(n)',
      '  seq = [0, 1]',
      '  (2...n).each { |i| seq << seq[-1] + seq[-2] }',
      '  seq[0...n]',
      'end',
      '',
      'def greet(name)',
      '  puts "Hello, #{name}! 👋"',
      '  puts "Welcome to the Online Compiler!"',
      'end',
      '',
      'greet("Developer")',
      'puts',
      "puts \"Fibonacci(10): #{fibonacci(10).join(', ')}\"",
    ].join('\n'),
  },

  // ── Kotlin ──────────────────────────────────────────────────────────────
  {
    id: 'kotlin',
    label: 'Kotlin',
    compiler: 'kotlin-head',
    extension: 'kt',
    color: '#f59e0b',
    icon: '🎯',
    defaultCode: [
      '// Kotlin — Online Compiler',
      '',
      'fun fibonacci(n: Int): List<Long> {',
      '    val seq = mutableListOf(0L, 1L)',
      '    for (i in 2 until n) seq.add(seq[i-1] + seq[i-2])',
      '    return seq.take(n)',
      '}',
      '',
      'fun greet(name: String) {',
      '    println("Hello, $name! 👋")',
      '    println("Welcome to the Online Compiler!")',
      '}',
      '',
      'fun main() {',
      '    greet("Developer")',
      '    println()',
      '    println("Fibonacci(10): ${fibonacci(10).joinToString(", ")}")',
      '}',
    ].join('\n'),
  },

  // ── C# ──────────────────────────────────────────────────────────────────
  {
    id: 'csharp',
    label: 'C#',
    compiler: 'dotnetcore-8.0.402',
    extension: 'cs',
    color: '#818cf8',
    icon: '🔵',
    defaultCode: [
      '// C# — Online Compiler',
      'using System;',
      'using System.Collections.Generic;',
      'using System.Linq;',
      '',
      'class Program {',
      '    static List<long> Fibonacci(int n) {',
      '        var seq = new List<long> { 0, 1 };',
      '        for (int i = 2; i < n; i++)',
      '            seq.Add(seq[i-1] + seq[i-2]);',
      '        return seq.Take(n).ToList();',
      '    }',
      '',
      '    static void Greet(string name) {',
      '        Console.WriteLine($"Hello, {name}! 👋");',
      '        Console.WriteLine("Welcome to the Online Compiler!");',
      '    }',
      '',
      '    static void Main() {',
      '        Greet("Developer");',
      '        Console.WriteLine();',
      '        Console.WriteLine("Fibonacci(10): " + string.Join(", ", Fibonacci(10)));',
      '    }',
      '}',
    ].join('\n'),
  },

  // ── Bash ────────────────────────────────────────────────────────────────
  {
    id: 'bash',
    label: 'Bash',
    compiler: 'bash',
    extension: 'sh',
    color: '#10b981',
    icon: '💻',
    defaultCode: [
      '#!/bin/bash',
      '# Bash — Online Compiler',
      '',
      'fibonacci() {',
      '    local n=$1 a=0 b=1 result=""',
      '    for ((i=0; i<n; i++)); do',
      '        result="$result $a"',
      '        local tmp=$((a+b))',
      '        a=$b; b=$tmp',
      '    done',
      '    echo "$result"',
      '}',
      '',
      'greet() {',
      '    echo "Hello, $1! 👋"',
      '    echo "Welcome to the Online Compiler!"',
      '}',
      '',
      'greet "Developer"',
      'echo ""',
      'echo "Fibonacci(10):$(fibonacci 10)"',
    ].join('\n'),
  },

  // ── Swift ───────────────────────────────────────────────────────────────
  {
    id: 'swift',
    label: 'Swift',
    compiler: 'swift-6.0.1',         // verified
    extension: 'swift',
    color: '#f97316',
    icon: '🕊️',
    defaultCode: [
      '// Swift — Online Compiler',
      '',
      'func fibonacci(_ n: Int) -> [Int] {',
      '    var seq = [0, 1]',
      '    for i in 2..<n { seq.append(seq[i-1] + seq[i-2]) }',
      '    return Array(seq.prefix(n))',
      '}',
      '',
      'func greet(_ name: String) {',
      '    print("Hello, \\(name)! 👋")',
      '    print("Welcome to the Online Compiler!")',
      '}',
      '',
      'greet("Developer")',
      'print()',
      'print("Fibonacci(10): \\(fibonacci(10).map(String.init).joined(separator: ", "))")',
    ].join('\n'),
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// EXECUTION BACKENDS
// Primary  : Wandbox  (wandbox.org)  — free, no key, wide language support
// Fallback : CodeX    (codex.jaagrav.in) — free, no key, 9 languages
// Strategy : Wandbox with 2 auto-retries on OCI/server errors → CodeX fallback
// ═══════════════════════════════════════════════════════════════════════════

interface RunResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

/** OCI / server-overload signals from Wandbox */
const OCI_PATTERNS = [
  'OCI runtime',
  'crun: clone',
  'Resource temporarily unavailable',
  'container',
  'sandbox',
];

const isTransientError = (msg: string) =>
  OCI_PATTERNS.some(p => msg.includes(p)) ||
  /5[0-9]{2}/.test(msg); // 5xx HTTP errors

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

// ── Backend 1: Wandbox ────────────────────────────────────────────────────
async function runWandbox(lang: LangConfig, code: string, stdin: string): Promise<RunResult> {
  const payload: Record<string, string> = { compiler: lang.compiler, code, stdin };
  if (lang.compilerOptions) payload.options = lang.compilerOptions;

  let res: Response;
  try {
    res = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('NETWORK: Unable to reach Wandbox. Check your internet connection.');
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText);
    throw new Error(`WANDBOX_HTTP_${res.status}: ${detail}`);
  }

  const data = await res.json();
  const exitCode  = parseInt(String(data.status ?? '0'), 10);
  const compileErr = String(data.compiler_error  ?? '').trim();
  const compileOut = String(data.compiler_output ?? '').trim();
  const programOut = String(data.program_output  ?? '').trim();
  const programErr = String(data.program_error   ?? '').trim();

  // Detect OCI / container errors returned inside the response body
  if (isTransientError(programErr) && !programOut && !compileErr) {
    throw new Error(`OCI_TRANSIENT: ${programErr}`);
  }

  if (compileErr) {
    return { stdout: compileOut, stderr: compileErr, exitCode: exitCode !== 0 ? exitCode : 1 };
  }

  return {
    stdout: programOut,
    stderr: [compileOut, programErr].filter(Boolean).join('\n'),
    exitCode,
  };
}

// ── Backend 2: CodeX (fallback for 9 common languages) ───────────────────
// https://api.codex.jaagrav.in  — free, no auth, CORS-enabled
const CODEX_LANG: Record<string, string> = {
  python: 'py', javascript: 'js', java: 'java',
  cpp: 'cpp', c: 'c', go: 'go',
  php: 'php', ruby: 'rb', bash: 'sh',
};

async function runCodex(lang: LangConfig, code: string, stdin: string): Promise<RunResult> {
  const langCode = CODEX_LANG[lang.id];
  if (!langCode) throw new Error(`CODEX_UNSUPPORTED: ${lang.label} not supported by fallback`);

  let res: Response;
  try {
    res = await fetch('https://api.codex.jaagrav.in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language: langCode, input: stdin }),
    });
  } catch {
    throw new Error('NETWORK: Unable to reach CodeX fallback.');
  }

  if (!res.ok) throw new Error(`CODEX_HTTP_${res.status}: ${res.statusText}`);

  const data = await res.json();
  const stdout = String(data.output ?? '').trim();
  const stderr = String(data.error  ?? '').trim();
  return { stdout, stderr, exitCode: stderr && !stdout ? 1 : 0 };
}

// ── Main entry: retry Wandbox → fallback to CodeX ────────────────────────
async function runCode(
  lang: LangConfig,
  code: string,
  stdin: string,
  onStatus?: (msg: string) => void,
): Promise<RunResult> {
  const MAX_RETRIES = 2;
  const notify = (msg: string) => onStatus?.(msg);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      notify(attempt === 1
        ? `Compiling ${lang.label}…`
        : `Retrying… (attempt ${attempt}/${MAX_RETRIES})`);
      return await runWandbox(lang, code, stdin);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const isLast = attempt === MAX_RETRIES;

      // Network errors are not retryable
      if (msg.startsWith('NETWORK:')) throw new Error(msg.replace('NETWORK: ', ''));

      // Non-transient compile/runtime error — surface immediately
      if (!isTransientError(msg) && !msg.startsWith('OCI_TRANSIENT') &&
          !msg.includes('WANDBOX_HTTP_5')) {
        throw new Error(msg.replace(/^WANDBOX_HTTP_\d+: /, ''));
      }

      if (!isLast) {
        notify('⚠️ Server busy — retrying in 1.8s…');
        await sleep(1800);
        continue;
      }

      // All Wandbox retries exhausted → try CodeX fallback
      const codexLang = CODEX_LANG[lang.id];
      if (codexLang) {
        try {
          notify('Switching to fallback engine (CodeX)…');
          const result = await runCodex(lang, code, stdin);
          return {
            ...result,
            stderr: result.stderr
              ? `[Fallback engine] ${result.stderr}`
              : result.stderr,
          };
        } catch {
          // CodeX also failed — fall through to final error
        }
      }

      // Nothing worked
      if (isTransientError(msg) || msg.startsWith('OCI_TRANSIENT')) {
        throw new Error(
          '⚠️ Compiler servers are temporarily overloaded.\n' +
          'Both execution engines are busy. Please wait 10–15 seconds and try again.'
        );
      }
      throw new Error(msg.replace(/^(OCI_TRANSIENT|WANDBOX_HTTP_\d+): /, ''));
    }
  }

  throw new Error('Execution failed after retries.');
}

// ── Indent helper ──────────────────────────────────────────────────────────
function getLineIndent(line: string): string {
  const m = line.match(/^(\s*)/);
  return m ? m[1] : '';
}

// ── StdoutBlock ────────────────────────────────────────────────────────────
function StdoutBlock({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="stdout-block">
      <div className="stdout-header"><CheckCircle size={13} /> Standard Output</div>
      <pre className="stdout-text">{text}</pre>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
const Compiler: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<LangConfig>(LANGUAGES[0]);
  const [code, setCode]                 = useState(LANGUAGES[0].defaultCode);
  const [stdin, setStdin]               = useState('');
  const [output, setOutput]             = useState('');
  const [stderrOut, setStderrOut]       = useState('');
  const [exitCode, setExitCode]         = useState<number | null>(null);
  const [running, setRunning]           = useState(false);
  const [runStatus, setRunStatus]       = useState('Compiling…');
  const [copied, setCopied]             = useState(false);
  const [langDropdownOpen, setLangDropdown] = useState(false);
  const [activeTab, setActiveTab]       = useState<'output' | 'stdin'>('output');
  const [fullscreen, setFullscreen]     = useState(false);
  const [lineCount, setLineCount]       = useState(1);
  const [runTime, setRunTime]           = useState<number | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumRef  = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* sync line count */
  useEffect(() => {
    setLineCount(code.split('\n').length);
  }, [code]);

  /* sync line-number scroll with editor scroll */
  const syncScroll = useCallback(() => {
    if (textareaRef.current && lineNumRef.current)
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop;
  }, []);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setLangDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* language change */
  const handleLangChange = (lang: LangConfig) => {
    setSelectedLang(lang);
    setCode(lang.defaultCode);
    setOutput('');
    setStderrOut('');
    setExitCode(null);
    setRunTime(null);
    setLangDropdown(false);
  };

  /* run code */
  const handleRun = async () => {
    if (running) return;
    setRunning(true);
    setOutput('');
    setStderrOut('');
    setExitCode(null);
    setRunTime(null);
    setRunStatus(`Compiling ${selectedLang.label}…`);
    setActiveTab('output');

    const start = Date.now();
    try {
      // Intercept the retry sleep so we can update status message
      const result = await runCode(
        selectedLang, code, stdin,
        (msg: string) => setRunStatus(msg),
      );
      setOutput(result.stdout);
      setStderrOut(result.stderr);
      setExitCode(result.exitCode);
      setRunTime(Date.now() - start);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setStderrOut(msg);
      setExitCode(-1);
      setRunTime(null);
    } finally {
      setRunning(false);
    }
  };

  /* keyboard shortcuts in editor */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget;

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart: s, selectionEnd: end, value } = ta;
      const newVal = value.slice(0, s) + '    ' + value.slice(end);
      setCode(newVal);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = s + 4; });
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const { selectionStart: s, value } = ta;
      const lineStart   = value.lastIndexOf('\n', s - 1) + 1;
      const currentLine = value.slice(lineStart, s);
      const indent      = getLineIndent(currentLine);
      const extra       = /[:{(\[]\s*$/.test(currentLine.trimEnd()) ? '    ' : '';
      const insertion   = '\n' + indent + extra;
      const newVal      = value.slice(0, s) + insertion + value.slice(ta.selectionEnd);
      setCode(newVal);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = s + insertion.length; });
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(new Blob([code], { type: 'text/plain' }));
    const a = Object.assign(document.createElement('a'), {
      href: url, download: `main.${selectedLang.extension}`,
    });
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setCode(selectedLang.defaultCode);
    setOutput('');
    setStderrOut('');
    setExitCode(null);
    setRunTime(null);
  };

  const hasOutput = Boolean(output || stderrOut);
  const isSuccess = exitCode === 0 && !stderrOut;

  return (
    <div className={`compiler-page${fullscreen ? ' fullscreen' : ''}`}>

      {/* ── Page Header ── */}
      {!fullscreen && (
        <div className="compiler-page-header">
          <div className="container">
            <div className="compiler-header-content">
              <div>
                <div className="section-label">
                  <Code2 size={14} /> Developer Tools
                </div>
                <h1 className="display-2 section-title">
                  Online <span className="text-gradient">Code Compiler</span>
                </h1>
                <p className="section-desc" style={{ maxWidth: 560 }}>
                  Write, run, and test code in 14 languages — directly in your browser.
                  No setup required. Powered by the Wandbox execution engine.
                </p>
              </div>
              <div className="compiler-header-stats">
                <div className="stat-pill"><Zap size={14} /><span>Instant Execution</span></div>
                <div className="stat-pill"><BookOpen size={14} /><span>14 Languages</span></div>
                <div className="stat-pill"><Terminal size={14} /><span>Stdin Support</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── IDE Container ── */}
      <div className="container">
        <div className="ide-wrapper">

          {/* ── Toolbar ── */}
          <div className="ide-toolbar">
            <div className="toolbar-left">
              {/* Language Selector */}
              <div className="lang-selector" ref={dropdownRef}>
                <button
                  className="lang-btn"
                  onClick={() => setLangDropdown(v => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={langDropdownOpen}
                  aria-label="Select language"
                >
                  <span className="lang-icon">{selectedLang.icon}</span>
                  <span className="lang-label">{selectedLang.label}</span>
                  <ChevronDown
                    size={14}
                    className={`lang-chevron${langDropdownOpen ? ' rotated' : ''}`}
                  />
                </button>

                {langDropdownOpen && (
                  <div className="lang-dropdown" role="listbox">
                    <div className="lang-grid">
                      {LANGUAGES.map(lang => (
                        <button
                          key={lang.id}
                          role="option"
                          aria-selected={lang.id === selectedLang.id}
                          className={`lang-option${lang.id === selectedLang.id ? ' active' : ''}`}
                          style={{ '--lang-color': lang.color } as React.CSSProperties}
                          onClick={() => handleLangChange(lang)}
                        >
                          <span className="lang-option-icon">{lang.icon}</span>
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <span className="file-name">main.{selectedLang.extension}</span>
            </div>

            <div className="toolbar-right">
              <button className="tool-btn" onClick={handleCopy} title="Copy code">
                {copied
                  ? <><CheckCircle size={15} style={{ color: 'var(--color-success)' }} />
                      <span className="tool-btn-label">Copied!</span></>
                  : <><Copy size={15} /><span className="tool-btn-label">Copy</span></>
                }
              </button>
              <button className="tool-btn" onClick={handleDownload} title="Download file">
                <Download size={15} /><span className="tool-btn-label">Download</span>
              </button>
              <button className="tool-btn" onClick={handleReset} title="Reset code">
                <RotateCcw size={15} /><span className="tool-btn-label">Reset</span>
              </button>
              <button
                className="tool-btn"
                onClick={() => setFullscreen(v => !v)}
                title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {fullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
              <button
                id="run-code-btn"
                className="run-btn"
                onClick={handleRun}
                disabled={running}
                title="Run code (Ctrl+Enter)"
              >
                {running
                  ? <><Loader size={15} className="spin-icon" /> Running…</>
                  : <><Play size={15} /> Run Code</>
                }
              </button>
            </div>
          </div>

          {/* ── Editor + Output ── */}
          <div className="ide-body">

            {/* Code Editor */}
            <div className="editor-pane">
              <div className="editor-header">
                <div className="editor-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="editor-title">Editor — {selectedLang.label}</span>
                <span className="shortcut-hint">Ctrl+Enter to run</span>
              </div>
              <div className="editor-body">
                <div className="line-numbers" ref={lineNumRef} aria-hidden="true">
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i + 1} className="line-num">{i + 1}</div>
                  ))}
                </div>
                <textarea
                  ref={textareaRef}
                  id="code-editor"
                  className="code-textarea"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onScroll={syncScroll}
                  spellCheck={false}
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="off"
                  aria-label="Code editor"
                  placeholder="// Write your code here…"
                />
              </div>
            </div>

            {/* Output / Stdin */}
            <div className="output-pane">
              <div className="output-tabs">
                <button
                  className={`output-tab${activeTab === 'output' ? ' active' : ''}`}
                  onClick={() => setActiveTab('output')}
                  id="tab-output"
                >
                  <Terminal size={13} /> Output
                  {hasOutput && (
                    <span className={`output-badge ${isSuccess ? 'badge-ok' : 'badge-err'}`}>
                      {isSuccess ? '✓' : '!'}
                    </span>
                  )}
                </button>
                <button
                  className={`output-tab${activeTab === 'stdin' ? ' active' : ''}`}
                  onClick={() => setActiveTab('stdin')}
                  id="tab-stdin"
                >
                  <Code2 size={13} /> Stdin
                </button>

                {runTime !== null && (
                  <div className={`run-status ${isSuccess ? 'status-ok' : 'status-err'}`}>
                    {isSuccess
                      ? <><CheckCircle size={13} /> Passed · {runTime}ms</>
                      : <><AlertCircle size={13} /> Error · {runTime}ms</>
                    }
                  </div>
                )}
              </div>

              <div className="output-body">
                {activeTab === 'output' ? (
                  <div className="output-content">
                    {running && (
                      <div className="output-running">
                        <Loader size={20} className="spin-icon" />
                        <span>{runStatus}</span>
                      </div>
                    )}

                    {!running && !hasOutput && (
                      <div className="output-placeholder">
                        <Terminal size={32} className="placeholder-icon" />
                        <p>Output will appear here after you run the code.</p>
                        <p className="placeholder-hint">
                          Press <kbd>Ctrl+Enter</kbd> or click <strong>Run Code</strong>
                        </p>
                      </div>
                    )}

                    {!running && <StdoutBlock text={output} />}

                    {!running && stderrOut && (
                      <div className="stderr-block">
                        <div className="stderr-header">
                          <AlertCircle size={13} /> Stderr / Errors
                        </div>
                        <pre className="stderr-text">{stderrOut}</pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="stdin-content">
                    <label className="stdin-label" htmlFor="stdin-area">
                      Standard Input (stdin) — one value per line
                    </label>
                    <textarea
                      id="stdin-area"
                      className="stdin-textarea"
                      value={stdin}
                      onChange={e => setStdin(e.target.value)}
                      placeholder="Enter program input here…"
                      spellCheck={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Status Bar ── */}
          <div className="ide-footer">
            <span className="footer-lang" style={{ color: selectedLang.color }}>
              {selectedLang.icon}&nbsp;{selectedLang.label}
            </span>
            <span className="footer-compiler">
              {selectedLang.compiler}
            </span>
            <span className="footer-lines">Ln {lineCount}</span>
            {exitCode !== null && (
              <span className={`footer-exit ${exitCode === 0 ? 'exit-ok' : 'exit-err'}`}>
                exit: {exitCode}
              </span>
            )}
            <span className="footer-powered">Wandbox Engine</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Compiler;
