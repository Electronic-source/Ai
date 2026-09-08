package com.electronicsource.ai

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import java.io.File
import java.io.FileOutputStream
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

private val Bg = Color(0xFF0B0F19)
private val Surface = Color(0xFF121827)
private val Accent = Color(0xFF7C5CFC)

data class WorkspaceFile(val name: String, val content: String)

class MainActivity : ComponentActivity() {
    private var pendingExport: File? = null

    private val createFileLauncher =
        registerForActivityResult(ActivityResultContracts.CreateDocument("*/*")) { uri ->
            val file = pendingExport
            pendingExport = null
            if (uri != null && file != null) {
                contentResolver.openOutputStream(uri)?.use { output ->
                    file.inputStream().use { input -> input.copyTo(output) }
                }
                Toast.makeText(this, "فایل ذخیره شد", Toast.LENGTH_SHORT).show()
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AiApp(
                onExportFile = { file ->
                    pendingExport = file
                    createFileLauncher.launch(file.name)
                }
            )
        }
    }
}

@Composable
fun AiApp(onExportFile: (File) -> Unit) {
    var tab by remember { mutableIntStateOf(0) }

    MaterialTheme(
        colorScheme = darkColorScheme(
            background = Bg,
            surface = Surface,
            primary = Accent
        )
    ) {
        Scaffold(
            containerColor = Bg,
            bottomBar = {
                NavigationBar(containerColor = Surface) {
                    NavigationBarItem(tab == 0, { tab = 0 }, icon = { Text("◉") }, label = { Text("Chat") })
                    NavigationBarItem(tab == 1, { tab = 1 }, icon = { Text("</>") }, label = { Text("Coder") })
                    NavigationBarItem(tab == 2, { tab = 2 }, icon = { Text("▣") }, label = { Text("Files") })
                    NavigationBarItem(tab == 3, { tab = 3 }, icon = { Text("⌘") }, label = { Text("GitHub") })
                }
            }
        ) { padding ->
            when (tab) {
                0 -> ChatScreen(Modifier.padding(padding))
                1 -> CoderScreen(Modifier.padding(padding))
                2 -> FilesScreen(Modifier.padding(padding), onExportFile)
                else -> GitHubScreen(Modifier.padding(padding))
            }
        }
    }
}

@Composable
fun Header(title: String, subtitle: String) {
    Column(Modifier.padding(20.dp)) {
        Text(title, style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
        Text(subtitle, color = Color.LightGray)
    }
}

@Composable
fun ChatScreen(modifier: Modifier = Modifier) {
    var text by remember { mutableStateOf("") }
    var messages by remember { mutableStateOf(listOf("سلام. من دستیار AI پروژه هستم.")) }
    Column(modifier.fillMaxSize()) {
        Header("AI Chat", "گفتگو با دستیار هوشمند")
        LazyColumn(
            Modifier.weight(1f).fillMaxWidth().padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(messages) { msg ->
                Surface(shape = RoundedCornerShape(16.dp), color = Surface) {
                    Text(msg, Modifier.padding(14.dp))
                }
            }
        }
        Row(
            Modifier.fillMaxWidth().padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = text,
                onValueChange = { text = it },
                modifier = Modifier.weight(1f),
                placeholder = { Text("پیامت را بنویس...") },
                maxLines = 4
            )
            Spacer(Modifier.width(8.dp))
            Button(onClick = {
                if (text.isNotBlank()) {
                    messages = messages + "تو: $text" + "AI: موتور AI در مرحله بعد فعال می‌شود."
                    text = ""
                }
            }) { Text("ارسال") }
        }
    }
}

@Composable
fun CoderScreen(modifier: Modifier = Modifier) {
    Column(modifier.fillMaxSize()) {
        Header("AI Coder", "تولید، بررسی و اصلاح کد")
        Card(
            Modifier.fillMaxWidth().padding(16.dp),
            colors = CardDefaults.cardColors(containerColor = Surface)
        ) {
            Column(Modifier.padding(18.dp)) {
                Text("Code Workspace", fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(12.dp))
                Text(
                    "ویرایشگر کد، تحلیل پروژه، Diff و ابزارهای AI در مراحل بعد اضافه می‌شوند.",
                    color = Color.LightGray
                )
                Spacer(Modifier.height(16.dp))
                Button(onClick = {}) { Text("شروع پروژه کدنویسی") }
            }
        }
    }
}

@Composable
fun FilesScreen(
    modifier: Modifier = Modifier,
    onExportFile: (File) -> Unit
) {
    var fileName by remember { mutableStateOf("hello.html") }
    var content by remember {
        mutableStateOf(
            "<!doctype html>\\n<html lang=\"fa\">\\n<head>\\n  <meta charset=\"UTF-8\">\\n  <title>AI Project</title>\\n</head>\\n<body>\\n  <h1>سلام از AI</h1>\\n</body>\\n</html>"
        )
    }
    var status by remember { mutableStateOf("فضای کاری آماده است.") }

    val workspace = remember {
        mutableStateListOf(
            WorkspaceFile("index.html", "<h1>AI Project</h1>"),
            WorkspaceFile("README.md", "# AI Project\\n\\nGenerated by AI app.")
        )
    }

    fun createTextFile() {
        val safeName = fileName.trim().ifBlank { "new-file.txt" }
        val file = File.createTempFile("ai_export_", ".tmp")
        file.writeText(content)
        val named = File(file.parentFile, safeName.replace(Regex("[\\\\/:*?\"<>|]"), "_"))
        if (named.exists()) named.delete()
        file.renameTo(named)
        onExportFile(named)
        status = "فایل $safeName برای ذخیره آماده شد."
    }

    fun createWorkspaceZip() {
        val zip = File.createTempFile("AI-Project-", ".zip")
        ZipOutputStream(FileOutputStream(zip)).use { zos ->
            workspace.forEach { item ->
                zos.putNextEntry(ZipEntry(item.name))
                zos.write(item.content.toByteArray(Charsets.UTF_8))
                zos.closeEntry()
            }
        }
        onExportFile(zip)
        status = "ZIP پروژه آماده شد."
    }

    Column(modifier.fillMaxSize()) {
        Header("Files", "ساخت فایل، پروژه و ZIP")

        Card(
            Modifier.fillMaxWidth().padding(horizontal = 16.dp),
            colors = CardDefaults.cardColors(containerColor = Surface)
        ) {
            Column(Modifier.padding(16.dp)) {
                Text("ساخت فایل جدید", fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(10.dp))
                OutlinedTextField(
                    value = fileName,
                    onValueChange = { fileName = it },
                    modifier = Modifier.fillMaxWidth(),
                    label = { Text("نام فایل") },
                    singleLine = true
                )
                Spacer(Modifier.height(10.dp))
                OutlinedTextField(
                    value = content,
                    onValueChange = { content = it },
                    modifier = Modifier.fillMaxWidth().heightIn(min = 150.dp),
                    label = { Text("محتوا") },
                    maxLines = 10
                )
                Spacer(Modifier.height(12.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(onClick = { createTextFile() }) {
                        Text("ساخت و ذخیره")
                    }
                    OutlinedButton(onClick = {
                        workspace.add(WorkspaceFile(fileName.trim().ifBlank { "new-file.txt" }, content))
                        status = "فایل به فضای کاری اضافه شد."
                    }) {
                        Text("افزودن به پروژه")
                    }
                }
            }
        }

        Spacer(Modifier.height(14.dp))

        Card(
            Modifier.fillMaxWidth().padding(horizontal = 16.dp),
            colors = CardDefaults.cardColors(containerColor = Surface)
        ) {
            Column(Modifier.padding(16.dp)) {
                Text("ZIP پروژه", fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(8.dp))
                Text(
                    "فایل‌های فضای کاری به یک ZIP واقعی تبدیل می‌شوند و با File Picker اندروید ذخیره می‌شوند.",
                    color = Color.LightGray
                )
                Spacer(Modifier.height(12.dp))
                Button(onClick = { createWorkspaceZip() }) {
                    Text("ساخت ZIP و ذخیره")
                }
            }
        }

        Spacer(Modifier.height(12.dp))
        Text(status, Modifier.padding(horizontal = 20.dp), color = Color.LightGray)

        Spacer(Modifier.height(8.dp))
        Text("فایل‌های پروژه", Modifier.padding(horizontal = 20.dp), fontWeight = FontWeight.Bold)
        LazyColumn(
            Modifier.fillMaxWidth().padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(workspace) { item ->
                Surface(
                    Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    color = Surface
                ) {
                    Text("📄 ${item.name}", Modifier.padding(14.dp))
                }
            }
        }
    }
}

@Composable
fun GitHubScreen(modifier: Modifier = Modifier) {
    val features = listOf(
        "نمایش Repositoryها",
        "خواندن و ویرایش فایل‌ها",
        "ساخت Branch",
        "Commit",
        "Issues",
        "Pull Requests",
        "GitHub Actions"
    )
    Column(modifier.fillMaxSize()) {
        Header("GitHub", "اتصال مستقیم به حساب و پروژه‌ها")
        Card(
            Modifier.fillMaxWidth().padding(horizontal = 16.dp),
            colors = CardDefaults.cardColors(containerColor = Surface)
        ) {
            Column(Modifier.padding(18.dp)) {
                Text("GitHub Account", fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(8.dp))
                Text(
                    "اتصال واقعی با GitHub App و OAuth/PKCE در مرحله بعد فعال می‌شود.",
                    color = Color.LightGray
                )
                Spacer(Modifier.height(16.dp))
                Button(onClick = {}) { Text("اتصال GitHub") }
            }
        }
        Spacer(Modifier.height(18.dp))
        Text("قابلیت‌های هدف", Modifier.padding(horizontal = 20.dp), fontWeight = FontWeight.Bold)
        LazyColumn(
            Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(features) { feature ->
                Surface(
                    Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    color = Surface
                ) {
                    Text("✓  $feature", Modifier.padding(14.dp))
                }
            }
        }
    }
}
