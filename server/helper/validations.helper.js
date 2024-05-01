const validateRowID = (rowID) => {
    let errors = {}
    typeof rowID === "number"? null: errors.id_type = "ID should be a number"
    return errors
}

export { validateRowID }