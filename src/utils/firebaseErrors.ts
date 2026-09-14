interface FirebaseErrorLike {
  code?: string
  message?: string
}

export function translateFirebaseError(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    const err = error as FirebaseErrorLike

    switch (err.code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'E-mail ou senha incorretos.'
      case 'auth/email-already-in-use':
        return 'Este e-mail já está cadastrado.'
      case 'auth/weak-password':
        return 'A senha digitada é muito fraca.'
      case 'auth/too-many-requests':
        return 'Muitas tentativas malsucedidas. Tente novamente mais tarde.'
      case 'auth/network-request-failed':
        return 'Erro de conexão com a rede. Verifique sua internet.'
      default:
        return 'Ocorreu um erro ao processar sua solicitação. Tente novamente.'
    }
  }

  return 'Ocorreu um erro inesperado. Tente novamente.'
}
