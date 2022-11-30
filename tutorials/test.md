You can create a new string table with a <code>StringTableResource</code>.

The <code>addAndHash()</code> method will add the given string to the table, and use its 32-bit hash as its key.

You can write output in the sandbox with <code>Sandbox.output()</code>. In this case, the string's key is being formatted and written to the output.

Finally, you can download a file generated in the sandbox with <code>Sandbox.download()</code>. If you're downloading multiple files in one script, they will be zipped before being downloaded.