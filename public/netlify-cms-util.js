function opt(options, defaults) {
  let obj = { ...defaults, ...options };

  return obj;
}

function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function cmsFileCollection(label = "", options, files = []) {
  return {
    label,
    name: options?.name || slugify(label),
    ...opt(options, {}),
    files,
  };
}

function cmsFolderCollection(
  label = "",
  options,
  format = "yml",
  create = true,
  identifier_field = "titulo",
  fields = []
) {
  const slug = options?.name || slugify(label);
  return {
    label,
    name: slug,
    folder: `/content/${slug}`,
    extension: format,
    create,
    identifier_field,
    slug: `{{${identifier_field}}}`,
    fields,
  };
}

function cmsFile(label = "", options, format = "yml", fields = []) {
  return {
    label,
    name: options?.name || slugify(label),
    file: `/content/${options?.name || slugify(label)}.${format}`,
    fields,
    ...opt(options, { i18n: true }),
  };
}

function fString(label = "", options) {
  return {
    label,
    name: options?.name || slugify(label),
    widget: "string",
    ...opt(options, { required: true, i18n: true }),
  };
}

function fText(label = "", options) {
  return {
    label,
    name: options?.name || slugify(label),
    widget: "text",
    ...opt(options, { required: true, i18n: true }),
  };
}

function fMarkdown(label = "", options) {
  return {
    label,
    name: options?.name || slugify(label),
    widget: "markdown",
    ...opt(options, { required: true, i18n: true }),
  };
}

function fBoolean(label = "", def = false, options) {
  return {
    label,
    name: options?.name || slugify(label),
    default: def,
    widget: "boolean",
    ...opt(options, { required: false }),
  };
}

function fFile(label = "", options) {
  return {
    label,
    name: options?.name || slugify(label),
    widget: "file",
    ...opt(options, { required: true, i18n: "duplicate" }),
  };
}

function fImage(label = "", options) {
  return {
    label,
    name: options?.name || slugify(label),
    widget: "image",
    ...opt(options, { required: false, i18n: "duplicate" }),
  };
}

function fObject(label = "", options, fields = []) {
  return {
    label,
    name: options?.name || slugify(label),
    widget: "object",
    fields,
    summary: options?.summary || label,
    ...opt(options, { i18n: true }),
  };
}

function fList(
  label = "",
  options,
  listOptions = { field: null, fields: null }
) {
  if (listOptions.field) {
    return {
      label,
      name: options?.name || slugify(label),
      widget: "list",
      field: listOptions.field,
      summary: options?.summary || label,
      ...opt(options, { i18n: true }),
    };
  }
  return {
    label,
    name: options?.name || slugify(label),
    widget: "list",
    fields: listOptions.fields,
    summary: options?.summary || label,
    ...opt(options, { i18n: true }),
  };
}
